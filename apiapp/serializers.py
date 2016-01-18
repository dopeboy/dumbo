from rest_framework import serializers
from apiapp import models


class SlimExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exam

        fields = ('id', 'name')


class ProblemSerializer(serializers.ModelSerializer):
    exam = SlimExamSerializer()

    class Meta:
        model = models.Problem
        fields = ('id', 'exam', 'order', 'problem_img_url',
                  'choices_img_url', 'tags', 'hierarchy')


class FullExamSerializer(serializers.ModelSerializer):
    problems = ProblemSerializer(many=True)

    class Meta:
        model = models.Exam
        fields = ('id', 'name', 'problems')
