from django import forms

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

# from base.models import PostFile, PostTexte
from base.models import UploadImage


class UserRegisterForm(UserCreationForm):
    """Class representing a person"""

    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


# Create a UserUpdateForm to update a username and email
class UserUpdateForm(forms.ModelForm):
    """Class representing a person"""

    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["username", "email"]


class FileRegisterForm(forms.Form):
    """Class representing a person"""

    # fields = ["lng", "ext_name", "file", "content", "created_at", "author_id"]

    lng = forms.CharField(max_length=50)
    ext_name = forms.CharField(max_length=50)
    content = forms.CharField(max_length=500)
    file = forms.FileField()
    author_id = forms.CharField(max_length=500)


class UserImage(forms.ModelForm):
    class Meta:
        # To specify the model to be used to create form
        model = UploadImage
        # It includes all the fields of model
        fields = "__all__"


class TranslateTextForm(forms.Form):
    """Class For Text Translate"""
    print('Hy... content')

    # fields = ["lng", "ext_name", "file", "content", "created_at", "author_id"]
    lng = forms.CharField(max_length=50)
    content = forms.CharField(max_length=2000)
    author_id = forms.CharField(max_length=500)
