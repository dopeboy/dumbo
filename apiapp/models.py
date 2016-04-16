from django.db import models


class Exam(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Problem(models.Model):
    exam = models.ForeignKey(Exam, related_name='problems')
    order = models.IntegerField()
    problem_img_url = models.CharField(max_length=128)

    # Optional
    choices_img_url = models.CharField(max_length=128, blank=True, null=True)

    # These will store JSON
    tags = models.TextField(blank=True, null=True)
    hierarchy = models.TextField(blank=True, null=True)
    display_text = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('order', 'exam')
        ordering = ['order']

    def __str__(self):
        return str(self.exam) + " - Problem " + str(self.order)


class Step(models.Model):
    problem = models.ForeignKey(Problem, related_name='steps')
    order = models.IntegerField()

    # These will store HTML
    question = models.TextField()
    answer = models.TextField()

    class Meta:
        unique_together = ('order', 'problem')
        ordering = ['order']

    def __str__(self):
        return str(self.problem) + " - Step " + str(self.order)

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.CharField(max_length=256)
    timestamp = models.DateTimeField(auto_now=True)
    event_type = models.CharField(max_length=256)

    # sparse event data
    int1 = models.BigIntegerField(default=-1, blank=True)
    int2 = models.BigIntegerField(default=-1, blank=True)

    string1 = models.CharField(max_length=256, blank=True)
    string2 = models.CharField(max_length=256, blank=True)
