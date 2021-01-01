from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from student_data.serializers import StudentSerializer
from student_data.models import StudentDb
from rest_framework import status
import requests
from django.http import JsonResponse
from django.utils.text import slugify



# Create your views here.
class StudentViewSet(GenericAPIView):
    @classmethod
    def get(self,request):
        if request.GET.get('sid'):
            studentdata = StudentDb.objects.get(pk=request.GET.get('sid'))
            snippetSerializer = StudentSerializer(studentdata)
        else:
            studentdata=StudentDb.objects.all()  
            snippetSerializer=StudentSerializer(studentdata,many='true') 
        response={"status":1,"message":"Student List","data":snippetSerializer.data}  
        return JsonResponse(response,safe=False)

    @classmethod
    def post(self,request):
        data=request.data  
        serializerData=""
        saveData=StudentSerializer(data=data) 
        if saveData.is_valid():
            saveData.save()
            serializerData=saveData.data
            statusResponse=status.HTTP_201_CREATED
        else:
            serializerData=saveData.errors
            statusResponse=status.HTTP_400_BAD_REQUEST

        response={"status":1,"message":"Student Add Successfully","statusResponse":statusResponse,"serializerData":serializerData}    
        return JsonResponse(response,safe=False)

    def put(self,request,sid=None):
        data=request.data
        instance=StudentDb.objects.filter(pk=request.data['sid']).first()
        serializer=StudentSerializer(instance,data=data)
        if serializer.is_valid():
            serializer.save()
        if serializer:
            data={"status":1,"message":"Updated Successfully","data":serializer.data}
            return JsonResponse(data,status=200,safe=False)
        else:
            data={"status":0,"message":"Oops There was a problem"}  
            return JsonResponse(data,status=500,safe=False) 
    @classmethod
    def deleted(self,request,sid=None) : 
        instance=StudentDb.objects.filter(pk=request.GET.get('sid')).first()   
        instance.delete()      
        studentData=StudentDb.objects.all()  
        snippetSerializer=StudentSerializer(studentData,many="true")
        data={"status":1,"message":"Successfully student deleted ","data":snippetSerializer.data}
        return JsonResponse(data,safe=False)


    

