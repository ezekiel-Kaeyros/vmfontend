from CourseCategory.models import CourseCategoryModels
from django import forms


class NewCourseCategory(forms.ModelForm):
    class Meta:
        model = CourseCategoryModels
        fields = (
            "name",
            "description",
        )
