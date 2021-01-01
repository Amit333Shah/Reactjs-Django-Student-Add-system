from django.urls import path
from django.conf.urls import include
from student_data import views
from django.conf.urls import url

urlpatterns=[
    path('students/',views.StudentViewSet.as_view()),
]