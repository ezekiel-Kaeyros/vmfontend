from project.models import projetModel
from django import forms


class NewProject(forms.ModelForm):
    class Meta:
        model = projetModel
        fields = ("title", "content")
