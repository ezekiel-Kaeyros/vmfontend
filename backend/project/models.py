from django.contrib.auth.models import User
from django.db import models
from users.models import Users
from ProjetCategory.models import ProjectCategoryModels


class projetModel(models.Model):
    title = models.CharField(max_length=1000)
    content = models.TextField(blank=True, null=True)
    project_icon_url = models.CharField(max_length=1000, blank=True, null=True)
    project_image_url = models.CharField(max_length=1000, blank=True, null=True)
    sponsor_images_url = models.TextField(blank=True, null=True)
    partners_images_url = models.TextField(blank=True, null=True)
    lead = models.CharField(max_length=1000, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edite_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=1000, blank=True, null=True)
    start_date = models.CharField(max_length=1000, blank=True, null=True)
    end_date = models.CharField(max_length=1000, blank=True, null=True)
    project_date = models.CharField(max_length=1000, blank=True, null=True)
    user = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(
        ProjectCategoryModels, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"project, {self.title } created!"
