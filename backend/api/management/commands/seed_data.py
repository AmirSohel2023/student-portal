from django.core.management.base import BaseCommand
from api.models import Course

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        courses = [
            {'title': 'Python for Beginners', 'description': 'Learn Python from scratch with hands-on projects and real-world applications.', 'instructor': 'Dr. Sarah Johnson', 'duration_hours': 40, 'category': 'programming', 'total_lessons': 20},
            {'title': 'React & Modern JavaScript', 'description': 'Build modern web applications with React, hooks, and the latest JS features.', 'instructor': 'Prof. Mike Chen', 'duration_hours': 35, 'category': 'programming', 'total_lessons': 18},
            {'title': 'Machine Learning Fundamentals', 'description': 'Explore ML algorithms, neural networks, and data-driven decision making.', 'instructor': 'Dr. Emily Rodriguez', 'duration_hours': 50, 'category': 'data_science', 'total_lessons': 25},
            {'title': 'UI/UX Design Principles', 'description': 'Master design thinking, prototyping, and creating user-centered interfaces.', 'instructor': 'Prof. Alex Kim', 'duration_hours': 30, 'category': 'design', 'total_lessons': 15},
            {'title': 'Data Structures & Algorithms', 'description': 'Essential CS concepts for coding interviews and efficient problem solving.', 'instructor': 'Dr. James Wilson', 'duration_hours': 45, 'category': 'programming', 'total_lessons': 22},
            {'title': 'Business Analytics', 'description': 'Turn data into business insights using statistical analysis and visualization tools.', 'instructor': 'Prof. Lisa Park', 'duration_hours': 25, 'category': 'business', 'total_lessons': 12},
        ]
        for c in courses:
            Course.objects.get_or_create(title=c['title'], defaults=c)
        self.stdout.write(self.style.SUCCESS('✅ Sample courses created!'))