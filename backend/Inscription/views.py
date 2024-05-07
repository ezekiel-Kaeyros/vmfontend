from rest_framework.response import Response
from django.http import JsonResponse
from courses.models import CourseModels
from Inscription.models import InscriptionModels
from rest_framework.decorators import api_view
from rest_framework import status
from .forms import NewInscription

# Create your views here.


def get_list(self):
    inscriptions = list(InscriptionModels.objects.all().values())
    return JsonResponse(
        {
            "inscriptions": inscriptions,
        },
    )


@api_view(["GET"])
def get(request, _id):
    if request.method == "GET":
        inscript = InscriptionModels.objects.filter(id=_id).values()
        return Response(inscript[0])


@api_view(["POST"])
def create(request):
    # form = CourseModels(request.data)

    if request.method == "POST":
        if request.data.get("course_id"):
            # print("========================================")
            # return Response("ok")
            data = {
                "email": request.data.get("email"),
                "first_name": request.data.get("first_name"),
                "last_name": request.data.get("last_name"),
                "course_code": request.data.get("course_code"),
                "course_title": request.data.get("course_title"),
            }
            form = NewInscription(data)

            if form.is_valid():
                try:
                    course = CourseModels.objects.filter(
                        id=request.data.get("course_id")
                    )[0]
                    inscript = InscriptionModels.objects.create(
                        email=data.get("email"),
                        first_name=data.get("first_name"),
                        last_name=data.get("last_name"),
                        course_code=data.get("course_code"),
                        course_title=data.get("course_title"),
                        message=request.data.get("message"),
                    )
                    inscript.course = course
                    inscript.save()
                    # return Response({"info": "created"}, status=status.HTTP_201_CREATED)
                    new_inscript = InscriptionModels.objects.filter(
                        id=inscript.id
                    ).values()
                    return Response(new_inscript[0])
                except Exception as e:
                    return Response(e, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(
                    {"error": "invalid forms data"}, status=status.HTTP_400_BAD_REQUEST
                )
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def remove(request, _id):
    if request.method == "DELETE":
        InscriptionModels.objects.filter(id=_id).delete()

        return Response(
            {
                "info": "delete",
            },
            status=status.HTTP_200_OK,
        )


@api_view(["PUT"])
def updatecourse(request, _id):
    Inscript = InscriptionModels.objects.get(id=_id)
    Inscript.email = request.data.get("email")
    Inscript.course_title = request.data.get("course_title")
    Inscript.course_code = request.data.get("course_code")
    Inscript.first_name = request.data.get("first_name")
    Inscript.last_name = request.data.get("last_name")
    Inscript.message = (request.data.get("message"),)
    if request.data.get("course_id"):
        course = CourseModels.objects.filter(id=request.data.get("course_id"))[0]
        Inscript.course = course
    Inscript.save()

    Inscript = InscriptionModels.objects.filter(id=_id).values()
    return Response({"info": Inscript[0]}, status=status.HTTP_200_OK)
