from django.views.generic import TemplateView
from django.conf import settings
from rest_framework import viewsets
from apiapp import models
from apiapp import serializers


class NoDataView(TemplateView):
    template_name = settings.DEFAULT_INDEX_PATH


class MobileView(TemplateView):
    template_name = settings.DEFAULT_MOBILE_PATH


class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Exam.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.SlimExamSerializer
        elif self.action == "retrieve":
            return serializers.FullExamSerializer


class ProblemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Problem.objects.all()
    serializer_class = serializers.ProblemSerializer
