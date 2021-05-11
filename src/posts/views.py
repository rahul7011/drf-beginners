from .models import Author,Post
from django.shortcuts import render
from rest_framework.generics import(
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    )

from .serializers import PostSerializer,PostCreateSerializer
from rest_framework.permissions import AllowAny,IsAuthenticatedOrReadOnly,IsAuthenticated

class PostListView(ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializer
    permission_classes=(AllowAny,)

def home(request):
    return render(request,"index.html")

def post_detail(request,pk):
    return render(request,"post_detail.html")

class PostCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()

class PostDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class PostUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()

class PostDeleteView(DestroyAPIView):
    permission_classes = (AllowAny, )
    queryset = Post.objects.all()