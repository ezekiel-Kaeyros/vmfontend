from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User  # Import User model
from django.utils import timezone
from base.models import Profile, PostFile, PostTexte  # Import the form we just created
from .serializers import ProfileSerializer
from .utils import translate_pdf_file, translate_extracted
from .forms import UserRegisterForm, FileRegisterForm, TranslateTextForm, UserImage
from datetime import date
import time


@api_view(["GET"])
def get_profile(request):
    """Function get all subscribe users."""
    users = Profile.objects.all()
    serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def register(request):
    """Create some profile."""
    form = UserRegisterForm(request.data)
    if form.is_valid():
        form.save()  # Save user to Database
        username = form.cleaned_data.get("username")
        email = form.cleaned_data.get("email")
        user = User.objects.get(email=email)
        profile = Profile(user=user)
        profile.save()
        return Response(
            {"username": username, "email": email}, status=status.HTTP_201_CREATED
        )
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def translate_file(request):
    """post some pdf doc to translate."""
    form = FileRegisterForm(request.POST, request.FILES)
    if form.is_valid():
        body = request.POST
        ext_name, lng, content, author_id = (
            body["ext_name"],
            body["lng"],
            body["content"],
            body["author_id"],
        )
        # print(form.get("content"))
        file = request.FILES["file"]
        # user = User.objects.get(id=author_id)
        post = PostFile(
            lng=lng,
            file=file,
            # author_id=user,
            ext_name=ext_name,
            content="content",
        )
        post.save()
        arr = post.file.url.split("/")
        file_path = arr[1] + "/" + arr[2]
        # text = translate_extracted(extract_text_from_pdf(file_path))
        text = translate_pdf_file(file_path)
        print("jai finis ici")
        print(text)
        return Response({"text": text})
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def translate_image(request):
    """post some image to translate."""
    body = request.POST
    # user = User.objects.get(id=body["author_id"])
    request.POST._mutable = True
    request.POST["created_at"] = date.today()
    # if user:
    #     request.POST["author_id"] = user
    form = UserImage(request.POST, request.FILES)
    # time.sleep(20000)
    if form.is_valid():
        Current_form = form.save()
        # print(form.get("content"))
        # img_object = form.instance
        print(Current_form.image)
        image_url = f"media/{Current_form.image}"
        return Response({"image": image_url})
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def translate_texte(request):
    """post some texte to translate."""
    form = TranslateTextForm(request.data)
    # time.sleep(20000)
    if form.is_valid():
        body = request.data
        lng = body["lng"]
        content = body["content"]
        author_id = body["author_id"]
        # print(form.get("content"))
        post = PostTexte(
            lng=lng,
            # author_id=user,
            content=content,
        )
        post.save()

        text = translate_extracted(content, lng)
        print(text)
        return Response({"text": text})
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)
