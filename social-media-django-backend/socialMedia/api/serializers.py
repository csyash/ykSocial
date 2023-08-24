from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CustomUser,Post,PostComment,PostLike,UserFollowing
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name', 'last_name' , 'email']


class PostSerializer(ModelSerializer):
    user = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id','caption','image','createdAt','user','likes','comments']

    def get_user(self,obj):
        custom_user = CustomUser.objects.get(user=obj.user.user)
        custom_user_serializer = CustomUserSerializer(custom_user,many=False)
        return custom_user_serializer.data
    
    def get_likes(self,obj):
        return PostLike.objects.filter(post=obj).count()
    
    def get_comments(self,obj):
        posts = PostComment.objects.filter(post=obj)
        post_comment_serializer = PostCommentSerializer(posts,many=True)
        return post_comment_serializer.data
    
    

class ProfilePageSerializer(ModelSerializer):
    user = UserSerializer()
    posts = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['user','profilePic','coverPic','bio','posts']

    def get_posts(self, obj):
        posts = Post.objects.filter(user=obj).order_by("-createdAt")
        post_serializer = PostSerializer(posts, many=True)
        return post_serializer.data
        


class CustomUserSerializer(ModelSerializer):
    user = UserSerializer() 
    class Meta:
        model = CustomUser
        fields = ['user','profilePic']

class PostLikeSerializer(ModelSerializer):
    class Meta:
        model = PostLike
        fields = '__all__'

class PostCommentSerializer(ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = PostComment
        fields = ['id','comment','user']

class UserFollowingSerializer(ModelSerializer):
    
    user = serializers.SerializerMethodField()
    class Meta:
        model = UserFollowing
        fields = ['user']

    def get_user(self,obj):
        user = obj.user_who_is_getting_followed
        serializer = CustomUserSerializer(user)
        return serializer.data



    
    