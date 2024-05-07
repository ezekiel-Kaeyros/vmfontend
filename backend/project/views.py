from .forms import NewProject
from rest_framework.response import Response
from django.http import JsonResponse

from django.core import serializers
from utils.filehandler import upload_file
from .models import projetModel
from ProjetCategory.models import ProjectCategoryModels
from rest_framework.decorators import api_view
from rest_framework import status
from users.models import Users

# Create your views here.


def get_list(self):
    projects = list(projetModel.objects.all().values())
    return JsonResponse(
        {
            "projects": projects,
        },
    )


@api_view(["GET"])
def get(request, _id):
    if request.method == "GET":
        project = projetModel.objects.filter(id=_id).values()
        return Response(project[0])


@api_view(["POST"])
def create(request):
    if request.method == "POST":
        if request.data.get("project_icon_url"):
            project_icon_url = request.data.get("project_icon_url")
        else:
            project_icon_url = None

        if request.data.get("project_image_url"):
            project_image_url = request.data.get("project_image_url")
        else:
            project_image_url = None
        if request.data.get("sponsor_images_url"):
            sponsor_images_url = request.data.get("sponsor_images_url")
        else:
            sponsor_images_url = {}

        if not request.data.get("title"):
            return Response(
                {"message": "please provide title"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not request.data.get("content"):
            return Response(
                {"message": "please provide content"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if request.data.get("category_id"):
                projet = projetModel.objects.create(
                    title=request.data.get("title"),
                    content=request.data.get("content"),
                    project_icon_url=project_icon_url,
                    project_image_url=project_image_url,
                    sponsor_images_url=sponsor_images_url,
                    lead=request.data.get("lead"),
                    code=request.data.get("code"),
                    location=request.data.get("location"),
                    project_date=request.data.get("project_date"),
                    start_date=request.data.get("start_date"),
                    end_date=request.data.get("end_date"),
                )
                category = ProjectCategoryModels.objects.filter(
                    id=request.data.get("category_id")
                )[0]
                # category.project.add = projetModel.objects.filter(id=projet.id)[0]
                projet.category = category
                if request.data.get("user_id"):
                    user = Users.objects.filter(id=request.data.get("user_id"))[0]
                    projet.user = user
                projet.save()
                category.save()
                new_projet = projetModel.objects.filter(id=projet.id).values()
                return Response(new_projet[0])
            else:
                projet = projetModel.objects.create(
                    title=request.data.get("title"),
                    content=request.data.get("content"),
                    project_icon_url=project_icon_url,
                    project_image_url=project_image_url,
                    sponsor_images_url=sponsor_images_url,
                    lead=request.data.get("lead"),
                    code=request.data.get("code"),
                    location=request.data.get("location"),
                    project_date=request.data.get("project_date"),
                    start_date=request.data.get("start_date"),
                    end_date=request.data.get("end_date"),
                )
                if request.data.get("user_id"):
                    user = Users.objects.filter(id=request.data.get("user_id"))[0]
                    projet.user = user
                    projet.save()
                new_projet = projetModel.objects.filter(id=projet.id).values()
                return Response(new_projet[0])
                # return Response({"info": "created"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def remove(request, _id):
    if request.method == "DELETE":
        projetModel.objects.filter(id=_id).delete()

        return Response(
            {
                "info": "delete",
            },
            status=status.HTTP_200_OK,
        )


@api_view(["PUT"])
def updatecourse(request, _id):
    projet = projetModel.objects.get(id=_id)

    if request.data.get("project_icon_url"):
        projet.project_icon_url = request.data.get("project_icon_url")
    if request.data.get("project_image_url"):
        projet.project_image_url = request.data.get("project_image_url")
    if request.data.get("sponsor_images_url"):
        projet.sponsor_images_url = request.data.get("sponsor_images_url")
    if request.data.get("title"):
        projet.title = request.data.get("title")
    if request.data.get("content"):
        projet.content = request.data.get("content")
    if request.data.get("code"):
        projet.code = request.data.get("code")
    if request.data.get("lead"):
        projet.lead = request.data.get("lead")
    if request.data.get("location"):
        projet.location = request.data.get("location")
    if request.data.get("user_id"):
        user = Users.objects.filter(id=request.data.get("user_id"))[0]
        projet.user = user
    if request.data.get("project_date"):
        projet.project_date = request.data.get("project_date")
    if request.data.get("start_date"):
        projet.start_date = request.data.get("start_date")
    if request.data.get("end_date"):
        projet.end_date = request.data.get("end_date")
    if request.data.get("category_id"):
        category = ProjectCategoryModels.objects.filter(
            id=request.data.get("category_id")
        )[0]
        projet.category = category
    projet.save()
    projetEdited = projetModel.objects.filter(id=_id).values()
    return Response(projetEdited[0])
