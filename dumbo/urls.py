from django.conf.urls import url
from django.contrib import admin
from rest_framework.routers import SimpleRouter
from apiapp import views
from django.conf.urls import include, url, patterns

router = SimpleRouter(trailing_slash=False)
router.register(r'exams', views.ExamViewSet, 'Exam')
router.register(r'problems', views.ProblemViewSet, 'Problem')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.NoDataView.as_view()),
    url(r'^exam', views.NoDataView.as_view()),
    url(r'^problem', views.NoDataView.as_view())
]
