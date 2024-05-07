from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView


class VmdoAdminPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, "vmdo_admin.html", context=None)
