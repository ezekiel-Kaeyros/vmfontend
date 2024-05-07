from rest_framework.response import Response
from django.http import JsonResponse
from .models import CategoryModels
from rest_framework.decorators import api_view
from rest_framework import status
from .forms import NewCategory

# Create your views here.


def get_list(self):
    category = list(CategoryModels.objects.all().values())
    return JsonResponse(
        {
            "category": category,
        },
    )


@api_view(["GET"])
def get(request, _id):
    if request.method == "GET":
        category = CategoryModels.objects.filter(id=_id).values()
        return Response(category[0])


@api_view(["POST"])
def create(request):
    # form = CategoryModels(request.data)

    if request.method == "POST":
        data = {
            "description": request.data.get("description"),
            "name": request.data.get("name"),
        }
        form = NewCategory(data)
    if form.is_valid():
        try:
            item = form.save(commit=False)
            item.save()
            projet = CategoryModels.objects.filter(
                name=request.data.get("name")
            ).values()
            return Response(projet[0])
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def remove(request, _id):
    if request.method == "DELETE":
        CategoryModels.objects.filter(id=_id).delete()

        return Response(
            {
                "info": "delete",
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["PUT"])
def updatecategory(request, _id):
    category = CategoryModels.objects.get(id=_id)
    category.name = request.data.get("name")
    category.description = request.data.get("description")
    category.save()
    categoryEdited = CategoryModels.objects.filter(id=_id).values()
    return Response(categoryEdited[0])
