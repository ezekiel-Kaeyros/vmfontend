from django.db import models
from rest_framework import serializers

# from courses.models import CourseModels


# Create your models here.
class ProjectCategoryModels(models.Model):
    name = models.CharField(max_length=1000, blank=True, default="")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now_add=True)
    # project = models.ManyToManyField("project.projetModel", blank=True)

    def __str__(self):
        return self.name
