from django.urls import path, re_path
from . import views


urlpatterns = [
    path("", views.get_list),
    path("add", views.create),
    re_path(r'^delete/(?P<_id>\d+)/$', views.remove),
    re_path(r'^update/(?P<_id>\d+)$', views.updatecourse),
    re_path(r'^(?P<_id>\d+)/$', views.get)
]
