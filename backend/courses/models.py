from datetime import datetime
from django.db import models
from CourseCategory.models import CourseCategoryModels
from django.utils import timezone
from users.models import Users


# Create your models here.
class CourseModels(models.Model):
    title = models.CharField(max_length=1000)
    content = models.TextField(blank=True, null=True)
    lead = models.CharField(max_length=1000, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    editeAt = models.DateTimeField(auto_now_add=True)
    start_date = models.CharField(max_length=1000, blank=True, null=True)
    end_date = models.CharField(max_length=1000, blank=True, null=True)
    start_time = models.CharField(max_length=1000, blank=True, null=True)
    end_time = models.CharField(max_length=1000, blank=True, null=True)
    days = models.CharField(max_length=1000, blank=True, null=True)
    duration = models.CharField(max_length=1000, blank=True, null=True)
    location = models.CharField(max_length=1000, blank=True, null=True)
    course_fees = models.FloatField(default=0, null=True, blank=True)
    category = models.ForeignKey(
        CourseCategoryModels, on_delete=models.SET_NULL, null=True, blank=True
    )
    # user = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.title }"


# class projetModel(models.Model):
#     title = models.CharField(max_length=1000)
#     content = models.TextField(blank=True, null=True)
#     # duration = models.TextField(blank=True, null=True)
#     project_icon_url = models.URLField(blank=True, null=True)
#     project_image_url = models.URLField(blank=True, null=True)
#     sponsor_images_url = models.URLField(blank=True, null=True)
#     lead = models.CharField(max_length=1000, default=" ")
#     code = models.CharField(max_length=1000, default=" ")
#     created_at = models.DateTimeField(auto_now_add=True)
#     edite_at = models.DateTimeField(auto_now_add=True)
#     user = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)
#     category = models.ForeignKey(
#         ProjectCategoryModels, on_delete=models.SET_NULL, null=True, blank=True
#     )

#     def __str__(self):
#         return f"project, {self.title } created!"
