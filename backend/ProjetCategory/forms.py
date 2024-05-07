from ProjetCategory.models import ProjectCategoryModels
from django import forms


class NewProjectCategory(forms.ModelForm):
    class Meta:
        model = ProjectCategoryModels
        fields = (
            "name",
            "description",
        )
