"""
URL configuration for edie_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("vmdo_admin/", include("vmdo_admin.urls")),
    path("api/", include("api.urls")),
    # path("articles/", include("articles.urls")),
    path("coursescategory/", include("CourseCategory.urls")),
    path("user/", include("users.urls")),
    path("inscription/", include("Inscription.urls")),
    path("courses/", include("courses.urls")),
    path("projectcategory/", include("ProjetCategory.urls")),
    path("project/", include("project.urls")),
    path("*", include("base.urls")),
    path("", include("base.urls")),
    path("__reload__/", include("django_browser_reload.urls")),
    # re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
