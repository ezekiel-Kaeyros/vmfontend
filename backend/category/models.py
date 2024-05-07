from django.db import models


# Create your models here.
class CategoryModels(models.Model):
    name = models.CharField(max_length=1000, blank=True, default="")
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
