from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile
    path('profile/', views.get_profile, name='profile'),
    path('profile/update/', views.update_profile, name='update_profile'),

    # Courses
    path('courses/', views.CourseListView.as_view(), name='courses'),

    # Enrollments
    path('enroll/<int:course_id>/', views.enroll_course, name='enroll'),
    path('my-enrollments/', views.my_enrollments, name='my_enrollments'),
    path('progress/<int:enrollment_id>/', views.update_progress, name='update_progress'),

    # Dashboard
    path('dashboard/stats/', views.dashboard_stats, name='dashboard_stats'),

    # Certificates
    path('certificates/', views.my_certificates, name='certificates'),
]