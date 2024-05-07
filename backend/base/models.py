from django.db import models  # Import models
from django.utils import timezone  # Import timezone for DateTimeField
from django.contrib.auth.models import User  # Import User model
from django import forms

# Create your models here.


class Profile(models.Model):
    """Class representing a person"""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )  # Delete profile when user is deleted
    # image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.username


class PostTexte(models.Model):
    """Class representing a action from user"""

    # title = models.CharField(max_length=100)
    lng = models.CharField(max_length=20)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    # author_id = models.ForeignKey(
    #     User, on_delete=models.CASCADE
    # )

    # __str__() method returns how the Post is printed
    def __str__(self):
        return self.content


class PostFile(models.Model):
    """Class representing a action from user"""

    # title = models.CharField(max_length=100)
    lng = models.CharField(max_length=20)
    ext_name = models.CharField(max_length=20)
    file = models.FileField(blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    # author_id = models.ForeignKey(
    #     User, on_delete=models.CASCADE
    # )

    # __str__() method returns how the Post is printed
    def __str__(self):
        return self.file.url


class UploadImage(models.Model):
    """Class representing a action from user"""

    image = models.ImageField(upload_to="images")
    created_at = models.DateTimeField(default=timezone.now)
    # author_id = models.ForeignKey(
    #     User, on_delete=models.CASCADE
    # )

    def __str__(self):
        return self.image.url
