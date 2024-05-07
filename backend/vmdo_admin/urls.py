"""url routes app."""

from django.urls import path
from . import views


urlpatterns = [
    # path("", views.HomePageView.as_view()),
    # path("/404", views.Home404View.as_view()),
    path("", views.VmdoAdminPageView.as_view()),
    # path("add/", views.register),
    # path("file/", views.translate_file),
    # path("image/", views.translate_image),
    # path("texte/", views.translate_texte),
]
