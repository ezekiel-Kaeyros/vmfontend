from django.contrib import admin

# Register your models here.
from .models import Profile, PostFile, PostTexte


admin.site.register(Profile)
admin.site.register(PostFile)
admin.site.register(PostTexte)
