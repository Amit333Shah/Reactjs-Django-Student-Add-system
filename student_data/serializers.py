from django.contrib.auth.models import User, Group
from rest_framework import serializers
from student_data.models import StudentDb

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentDb
        fields='__all__'