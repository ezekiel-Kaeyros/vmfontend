from category.models import CategoryModels
from django import forms


class NewCategory(forms.ModelForm):
    class Meta:
        model = CategoryModels
        fields = (
            "name",
            "description",
        )
