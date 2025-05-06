from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView): # list all the notes of the user
    serializer_class= NoteSerializer 
    permission_classes = [IsAuthenticated] #only authenticated users can create notes

    def get_queryset(self): # get the notes of the user
        user=self.request.user # get the user object
        return Note.objects.filter(auther=user) #get all the notes of the user
    
    def perform_create(self,serializer): # create a new note
        if serializer.is_valid(): 
            serializer.save(auther=self.request.user) 
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView): # delete a note
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated] # only authenticated users can delete notes

    def get_queryset(self):
        user=self.request.user 
        return Note.objects.filter(auther=user) 


class CreateUserView(generics.CreateAPIView): # create a new user
    queryset = User.objects.all() # get all the users
    serializer_class = UserSerializer 
    permission_classes = [AllowAny] # any user can create a new user
