from rest_framework import serializers
from apiapp import models
from django.core.exceptions import ValidationError


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        fields = ('id', 'order', 'problem_img_url', 'choices_img_url', 'tags', 'hierarchy')


class FullExamSerializer(serializers.ModelSerializer):
    problems = ProblemSerializer(many=True)

    class Meta:
        model = models.Exam
        fields = ('id', 'name', 'problems')


class SlimExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exam
        fields = ('id', 'name')

