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

    class Meta:
        unique_together = ('order', 'exam')

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
