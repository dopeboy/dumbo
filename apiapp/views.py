from django.shortcuts import render
from django.views.generic import TemplateView
from django.conf import settings

# Create your views here.
class NoDataView(TemplateView):
    template_name = settings.DEFAULT_INDEX_PATH
