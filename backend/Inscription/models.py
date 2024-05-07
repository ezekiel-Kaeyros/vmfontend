from datetime import datetime
from django.db import models
from courses.models import CourseModels
from django.utils import timezone
from users.models import Users


# Create your models here.
class InscriptionModels(models.Model):
    email = models.EmailField(blank=True, default="", unique=True)
    first_name = models.CharField(max_length=1000, blank=True, default="")
    last_name = models.CharField(max_length=1000, blank=True, default="")
    course_code = models.CharField(max_length=1000, blank=True, default="")
    course_title = models.CharField(max_length=1000, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(max_length=10000, blank=True, default="")
    course = models.ForeignKey(
        CourseModels, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.course_title }"
