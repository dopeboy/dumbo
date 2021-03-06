from django.contrib import admin
from apiapp import models


class StepAdmin(admin.ModelAdmin):
    list_max_show_all = 1000
    list_per_page = 1000

# Register your models here.
admin.site.register(models.Exam)
admin.site.register(models.Problem)
admin.site.register(models.Step, StepAdmin)
admin.site.register(models.Event)
