from rest_framework import serializers
from apiapp import models


class SlimExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exam
        fields = ('id', 'name')


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Step
        fields = ('id', 'order', 'question', 'answer')


class ProblemSerializer(serializers.ModelSerializer):
    exam = SlimExamSerializer()
    steps = StepSerializer(many=True)

    class Meta:
        model = models.Problem
        fields = ('id', 'exam', 'order', 'problem_img_url',
                  'choices_img_url', 'tags', 'hierarchy', 'steps',
                  'display_text')


class FullExamSerializer(serializers.ModelSerializer):
    problems = ProblemSerializer(many=True)

    class Meta:
        model = models.Exam
        fields = ('id', 'name', 'problems')
