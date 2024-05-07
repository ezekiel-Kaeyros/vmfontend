from django.db import models

# from courses.models import CourseModels


# Create your models here.
class CourseCategoryModels(models.Model):
    name = models.CharField(max_length=1000, blank=True, default="")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now_add=True)
    # course_ids = models.ManyToManyField("courses.CourseModels", blank=True)

    def __str__(self):
        return self.name
