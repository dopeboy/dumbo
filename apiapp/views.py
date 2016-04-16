from django.http import HttpResponse
from django.views.generic import TemplateView
from django.conf import settings
from rest_framework import viewsets
from apiapp import models
from apiapp import serializers
import json


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

def track_event(request):
    if request.method != "POST":
        return HttpResponse("Must use POST", status=400)

    try:
        data = json.loads(request.body)
    except:
        return HttpResponse("Failed to parse json\n" + request.body, status=400)

    if "event_type" not in data:
        return HttpResponse("Must include event_type", status=400)

    ip = request.META["REMOTE_ADDR"]
    event_type = data["event_type"]

    event = None
    if event_type == "helpful_step":
        if "step_id" not in data:
            return HttpResponse("Missing step_id", status=400)
        step_id = data["step_id"]

        if "helpful" not in data:
            return HttpResponse("Missing helpful", status=400)
        helpful = 1 if data["helpful"] else 0

        event = models.Event(ip=ip, event_type=event_type, int1=step_id, int2=helpful)
    elif event_type == "view_step":
        if "step_id" not in data:
            return HttpResponse("Missing step_id", status=400)
        step_id = data["step_id"]

        event = models.Event(ip=ip, event_type=event_type, int1=step_id)
    else:
        return HttpResponse("Invalid event_type: %s" % event_type, status=400)

    event.save()
    return HttpResponse("success", status=201)
