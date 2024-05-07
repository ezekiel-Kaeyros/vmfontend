from rest_framework.response import Response
from django.http import JsonResponse
from .models import Users
from rest_framework.decorators import api_view
from rest_framework import status
from passlib.hash import pbkdf2_sha256

# Create your views here.


def get_list(self):
    users = list(Users.objects.all().values())
    return JsonResponse(
        {
            "users": users,
        },
    )


@api_view(["GET"])
def get(request, _id):
    if request.method == "GET":
        user = Users.objects.filter(id=_id).values()
        return Response(user[0])


@api_view(["POST"])
def login(request):
    if request.method == "POST":
        if not request.data.get("email"):
            return Response(
                {"message": "please provide email"}, status=status.HTTP_400_BAD_REQUEST
            )
        if not request.data.get("password"):
            return Response(
                {"message": "please provide password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = Users.objects.filter(email=request.data.get("email")).values()
        if user:
            # example password
            password = request.data.get("password")
            result = pbkdf2_sha256.verify(password, user[0]["password"])

            print(result)
            if result:
                return Response(user[0])
            else:
                return Response(
                    {"message": "wrong password"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
    else:
        return Response({"message": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def create(request):
    # form = Users(request.data)

    if request.method == "POST":
        if not request.data.get("email"):
            return Response(
                {"message": "please provide email"}, status=status.HTTP_400_BAD_REQUEST
            )
        if not request.data.get("password"):
            return Response(
                {"message": "please provide password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not request.data.get("name"):
            return Response(
                {"message": "please provide name"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = Users.objects.filter(email=request.data.get("email"))

        if user:
            return Response(
                {"message": "email already exists, please provide another one"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # example password
        password = request.data.get("password")

        hash = pbkdf2_sha256.hash(password)
        item = Users.objects.create(
            name=request.data.get("name"),
            email=request.data.get("email"),
            password=hash,
        )

        user = Users.objects.filter(email=request.data.get("email")).values()
        return Response(user[0])
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def remove(request, _id):
    if request.method == "DELETE":
        Users.objects.filter(id=_id).delete()

        return Response(
            {
                "info": "delete",
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["PUT"])
def updatecourse(request, _id):
    user = Users.objects.get(id=_id)
    # user.name = request.data.get("name")
    # user.email = request.data.get("email")
    # user.password = request.data.get("password")
    # user.author = request.data.get("author")
    # user.end_date = request.data.get("end_date")
    # user.start_date = request.data.get("start_date")
    # user.user_fees = request.data.get("user_fees")
    # user.category = request.data.get("category")
    # user.save()
    user_update = Users.objects.filter(id=_id).values()
    return Response(user_update[0])
