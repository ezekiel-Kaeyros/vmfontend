from Inscription.models import InscriptionModels
from django import forms


class NewInscription(forms.ModelForm):
    class Meta:
        model = InscriptionModels
        fields = (
            "email",
            "first_name",
            "last_name",
            "course_code",
            # "end_date",
            # "course_fees",
        )
