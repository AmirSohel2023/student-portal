from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "🎓 Student Portal API is running!",
        "version": "1.0.0",
        "endpoints": {
            "admin": "/admin/",
            "register": "/api/auth/register/",
            "login": "/api/auth/login/",
            "courses": "/api/courses/",
            "my_enrollments": "/api/my-enrollments/",
            "dashboard_stats": "/api/dashboard/stats/",
            "certificates": "/api/certificates/",
        }
    })

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)