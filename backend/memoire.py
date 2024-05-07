# keep the file in django project root and add the following in the settings.py file.

# PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
# Then in the view do this.

# import os
# from django.conf.settings import PROJECT_ROOT

# file_ = open(os.path.join(PROJECT_ROOT, 'filename'))
# Update:

# In newer Django versions BASE_DIR is already defined in the settings.py file. So you can do the following.

# import os
# from django.conf import settings

# file_ = open(os.path.join(settings.BASE_DIR, 'filename'))
# python manage.py makemigrations

# python manage.py migrate

# from django.http import HttpResponseRedirect
# from django.shortcuts import render
# from .forms import UploadFileForm

# # Imaginary function to handle an uploaded file.
# from somewhere import handle_uploaded_file


# def upload_file(request):
#     if request.method == "POST":
#         form = UploadFileForm(request.POST, request.FILES)
#         if form.is_valid():
#             handle_uploaded_file(request.FILES["file"])
#             return HttpResponseRedirect("/success/url/")
#     else:
#         form = UploadFileForm()
#     return render(request, "upload.html", {"form": form})
# {
# "username":"erico",
# "password1":"tititata",
# "password2":"tititata",
# "email":"jeanne@test.com"
# }
