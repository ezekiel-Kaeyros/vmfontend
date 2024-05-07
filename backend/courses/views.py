from rest_framework.response import Response
from django.http import JsonResponse
from .models import CourseModels
from CourseCategory.models import CourseCategoryModels
from rest_framework.decorators import api_view
from rest_framework import status
import time

# Create your views here.


def get_list(self):
    course = list(CourseModels.objects.all().values())
    return JsonResponse(
        {
            "courses": course,
        },
    )


@api_view(["GET"])
def get(request, _id):
    if request.method == "GET":
        courses = CourseModels.objects.filter(id=_id).values()
        return Response(courses[0])


@api_view(["POST"])
def create(request):
    # print("hello")
    # return Response({"info": "created"}, status=status.HTTP_201_CREATED)
    if request.method == "POST":
        if request.data.get("category_id"):
            try:
                category = CourseCategoryModels.objects.filter(
                    id=request.data.get("category_id")
                )[0]
                course = CourseModels.objects.create(
                    content=request.data.get("content"),
                    code=request.data.get("code"),
                    lead=request.data.get("lead"),
                    title=request.data.get("title"),
                    end_date=request.data.get("end_date"),
                    start_date=request.data.get("start_date"),
                    days=request.data.get("days"),
                    course_fees=request.data.get("course_fees"),
                    duration=request.data.get("duration"),
                    # end_time=request.data.get("end_time"),
                    # start_time=request.data.get("start_time"),
                    location=request.data.get("location"),
                )
                course.category = category
                course.save()
                # category.course_ids.add(course)
                # category.course_ids.add = CourseModels.objects.filter(id=course.id)[0]
                category.save()
                # return Response({"info": "created"}, status=status.HTTP_201_CREATED)
                new_course = CourseModels.objects.filter(id=course.id).values()
                return Response(new_course[0])
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)
        else:
            # print("stop all")
            # time.sleep(3000)
            try:
                course = CourseModels.objects.create(
                    content=request.data.get("content"),
                    code=request.data.get("code"),
                    lead=request.data.get("lead"),
                    title=request.data.get("title"),
                    end_date=request.data.get("end_date"),
                    start_date=request.data.get("start_date"),
                    course_fees=request.data.get("course_fees"),
                    duration=request.data.get("duration"),
                    # end_time=request.data.get("end_time"),
                    # start_time=request.data.get("start_time"),
                    days=request.data.get("days"),
                    location=request.data.get("location"),
                )
                # return Response({"info": "created"}, status=status.HTTP_201_CREATED)
                new_course = CourseModels.objects.filter(id=course.id).values()
                return Response(new_course[0])
            except Exception as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def remove(request, _id):
    if request.method == "DELETE":
        CourseModels.objects.filter(id=_id).delete()

        return Response(
            {
                "info": "delete",
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["PUT"])
def updatecourse(request, _id):
    course = CourseModels.objects.get(id=_id)
    if request.data.get("category_id"):
        category = CourseCategoryModels.objects.filter(
            id=request.data.get("category_id")
        )[0]
        course.title = request.data.get("title")
        course.content = request.data.get("content")
        course.code = request.data.get("code")
        course.lead = request.data.get("lead")
        course.end_date = request.data.get("end_date")
        course.start_date = request.data.get("start_date")
        course.course_fees = request.data.get("course_fees")
        course.duration = request.data.get("duration")
        # course.end_time = request.data.get("end_time")
        # course.start_time = request.data.get("start_time")
        course.days = request.data.get("days")
        course.location = request.data.get("location")
        course.category = category
        course.save()
        course_update = CourseModels.objects.filter(id=_id).values()
        # category.course_ids.add(course)
        return Response(course_update[0])
    course.title = request.data.get("title")
    course.content = request.data.get("content")
    course.code = request.data.get("code")
    course.lead = request.data.get("lead")
    course.end_date = request.data.get("end_date")
    course.start_date = request.data.get("start_date")
    course.course_fees = request.data.get("course_fees")
    course.duration = request.data.get("duration")
    # course.end_time = request.data.get("end_time")
    # course.start_time = request.data.get("start_time")
    course.days = request.data.get("days")
    course.location = request.data.get("location")
    course.save()
    course_update = CourseModels.objects.filter(id=_id).values()
    return Response(course_update[0])
