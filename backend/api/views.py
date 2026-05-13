from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Avg
import uuid
from .models import Course, Enrollment, Certificate, StudentProfile
from .serializers import (
    UserSerializer, RegisterSerializer, CourseSerializer,
    EnrollmentSerializer, CertificateSerializer, StudentProfileSerializer
)

# Auth Views
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    try:
        profile = request.user.profile
    except StudentProfile.DoesNotExist:
        profile = StudentProfile.objects.create(user=request.user)
    serializer = StudentProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    try:
        profile = request.user.profile
    except StudentProfile.DoesNotExist:
        profile = StudentProfile.objects.create(user=request.user)
    serializer = StudentProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Course Views
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}

# Enrollment Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=404)
    enrollment, created = Enrollment.objects.get_or_create(
        student=request.user, course=course
    )
    if not created:
        return Response({'message': 'Already enrolled'}, status=200)
    return Response(EnrollmentSerializer(enrollment).data, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_enrollments(request):
    enrollments = Enrollment.objects.filter(student=request.user).select_related('course')
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_progress(request, enrollment_id):
    try:
        enrollment = Enrollment.objects.get(id=enrollment_id, student=request.user)
    except Enrollment.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    lessons_completed = request.data.get('completed_lessons', enrollment.completed_lessons)
    enrollment.completed_lessons = lessons_completed
    enrollment.progress = (lessons_completed / enrollment.course.total_lessons) * 100
    if enrollment.progress >= 100:
        enrollment.is_completed = True
        enrollment.completed_at = timezone.now()
        # Auto-generate certificate
        cert_id = f"CERT-{uuid.uuid4().hex[:8].upper()}"
        Certificate.objects.get_or_create(
            student=request.user,
            course=enrollment.course,
            enrollment=enrollment,
            defaults={'certificate_id': cert_id}
        )
    enrollment.save()
    return Response(EnrollmentSerializer(enrollment).data)

# Dashboard Stats
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    enrollments = Enrollment.objects.filter(student=request.user)
    completed = enrollments.filter(is_completed=True).count()
    in_progress = enrollments.filter(is_completed=False).count()
    avg_progress = enrollments.aggregate(avg=Avg('progress'))['avg'] or 0
    certificates = Certificate.objects.filter(student=request.user).count()
    return Response({
        'total_enrolled': enrollments.count(),
        'completed_courses': completed,
        'in_progress': in_progress,
        'average_progress': round(avg_progress, 1),
        'certificates_earned': certificates,
    })

# Certificates
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_certificates(request):
    certs = Certificate.objects.filter(student=request.user).select_related('course')
    serializer = CertificateSerializer(certs, many=True)
    return Response(serializer.data)