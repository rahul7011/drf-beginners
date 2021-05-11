from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author=serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields=(
            'id',
            'author',
            'title',
            'content',
            'publish_date',
            'updated',
        )

    def get_author(self,obj):
        return obj.author.user.username


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'author'
        )