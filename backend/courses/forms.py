from courses.models import CourseModels
from django import forms


class NewCourse(forms.ModelForm):
    class Meta:
        model = CourseModels
        fields = ("title", "content")
