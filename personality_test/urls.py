from django.urls import path
from . import views

app_name = "personality_test"

urlpatterns = [
    path("", views.home, name="home"),
    path("test/", views.test, name="test"),
    path("submit/", views.submit_answer, name="submit_answer"),
    path("result/", views.result, name="result"),
    path("restart/", views.restart, name="restart"),
]
