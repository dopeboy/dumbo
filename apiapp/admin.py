from django.contrib import admin
from apiapp import models

# Register your models here.
admin.site.register(models.Exam)
admin.site.register(models.Problem)
admin.site.register(models.Step)
