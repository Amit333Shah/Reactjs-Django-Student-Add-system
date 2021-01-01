from django.db import models
from datetime import datetime,timedelta

# Create your models here.
class StudentDb(models.Model):
    sid = models.CharField(primary_key=True,max_length=100)
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=100)
    branch = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=datetime.now()+timedelta(days=30)) 
    updated_at = models.DateTimeField(auto_now_add=True, null=True)
    deleted_at = models.DateTimeField(null=True)
