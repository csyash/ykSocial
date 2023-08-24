from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Post,PostComment,PostLike,UserFollowing
from .serializers import PostSerializer,ProfilePageSerializer,CustomUserSerializer,PostCommentSerializer, UserFollowingSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q
from rest_framework import status
# Create your views here.
""" 
endpoints:
    "/" - GET -  endpoints


    "/posts" - GET - all posts   DONE
    "/posts" - POST - new post   DONE


    "/posts/1/like" - post - like post     DONE
    "/posts/1/comment" - post - comment post       DONE

    "/profile/username" - GET - profile with its posts   DONE
    "/profile/username" - UPDATE - update profile  DONE
    "/profile/username" - DELETE - delete profile  DONE
    
    "/profile/username/follow" - POST 
    
      """


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        custom_user = CustomUser.objects.get(user=user)
        serializer = CustomUserSerializer(custom_user,many=False)
        token['userInfo'] = serializer.data
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def index(request):
    context = ['hello','nolo']
    return Response(context)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def posts(request):
    logged_in_user = CustomUser.objects.get(user=request.user)
    if request.method=='GET':
        
        #getting all the following of logged in user
        print(logged_in_user)
        logged_in_user_following = logged_in_user.following.all()

        # initialize empty queryset
        all_posts = Post.objects.none()

        # looping through all the following users, getting posts of all these users and concatenating it to all_posts
        for user in logged_in_user_following:
            posts = Post.objects.filter(user=user.user_who_is_getting_followed).order_by('-createdAt')
            all_posts |= posts

        serializer = PostSerializer(all_posts, many=True)
      

        return Response(serializer.data)
    
    if request.method=='POST':
        post_caption = request.data.get("post-caption")
        post_image = request.data.get('post-image')
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            new_post = Post.objects.create(user=logged_in_user,caption=post_caption,image=post_image)
            serializer = PostSerializer(new_post)
            return Response(serializer.data, status=200)
        
        return Response(serializer.errors, status=400)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postLike(request, postID):
    logged_in_user = CustomUser.objects.get(user=request.user)
    post = Post.objects.get(pk=postID)
    try:
        post_like = PostLike.objects.get(user=logged_in_user,post=post)
        post_like.delete()
        context = {"msg":"UnLiked"}
    except PostLike.DoesNotExist:
        post_like = PostLike.objects.create(user=logged_in_user, post=post)
        post_like.save()
        context = {"msg":"Liked"}

    return Response(context,status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postComment(request, postID):
    if request.method=='POST':
        logged_in_user = CustomUser.objects.get(user=request.user)
        post = Post.objects.get(pk=postID)
        comment = request.data.get('comment')
        post_comment = PostComment.objects.create(user=logged_in_user, post=post, comment=comment)
        post_comment.save()
      

        serializer = PostCommentSerializer(post_comment, many=False)
        return Response(serializer.data,status=200)


@api_view(['GET','DELETE','PUT'])
def profiles(request, profileUsername):
    if request.method=='GET':
        try:
            custom_user = User.objects.get(username=profileUsername).custom_user.get()
            serializer = ProfilePageSerializer(custom_user, many=False)
            return Response(serializer.data, status=200)
        except (User.DoesNotExist, CustomUser.DoesNotExist):
            context = {'error' : 'Profile with this user id does not exists'}
            return Response(context,status=404)
        
    if request.method=='DELETE':
        try:
            request.user.delete()
            context = {"msg" : "Profile Deleted Successfully"}
            return Response(context,status=200)
        except CustomUser.DoesNotExist:
            context = {'error' : 'Profile with this user id does not exists'}
            return Response(context,status=404)
        
    if request.method=='PUT':
        logged_in_user = CustomUser.objects.get(user=request.user)
        profile_pic = request.data.get("profile-pic")
        cover_pic = request.data.get("cover-pic")
        bio = request.data.get("bio")

        logged_in_user.profilePic = profile_pic
        logged_in_user.coverPic = cover_pic
        logged_in_user.bio = bio
        logged_in_user.save(update_fields=["profilePic","coverPic","bio"])

        serializer = ProfilePageSerializer(logged_in_user,many=False)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profileFollow(request,profileUsername):
    if request.user.is_authenticated:
        if request.method=='POST':
            try:
                logged_in_user = CustomUser.objects.get(user=request.user)
                following_user = CustomUser.objects.get(user__username = profileUsername)
                print(logged_in_user,following_user)
                follow_obj = UserFollowing.objects.get(user_who_is_following = logged_in_user, user_who_is_getting_followed = following_user)    
                follow_obj.delete()
                return Response("Follow obj Deleted", status=200)
            except UserFollowing.DoesNotExist:
                follow_obj = UserFollowing.objects.create(user_who_is_following = logged_in_user, user_who_is_getting_followed = following_user)
                follow_obj.save()
                return Response("Following Created",status=200)
    
    else:
        return Response("logged out")
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users_not_following(request):
    # Get the IDs of users that the current_user is following
    current_user = CustomUser.objects.get(user=request.user)
    users_following_ids = current_user.following.values_list('user_who_is_getting_followed__id', flat=True)

    # Exclude the users that the current_user is following and get the remaining users
    users_not_following = CustomUser.objects.exclude( Q(id__in=users_following_ids) | Q(user=current_user.user)).order_by('-createdAt')[:3]
    print(users_not_following)
    serializer = CustomUserSerializer(users_not_following,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    if request.method=="POST":
        username = request.data.get("username")
        first_name = request.data.get("first-name")
        last_name = request.data.get("last-name")
        password = request.data.get("password")
        try:
            user = User.objects.get(username=username)
            return Response("Username Exists")
        except User.DoesNotExist:
            new_user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, password=password)
            new_user.save()
            custom_user = CustomUser.objects.create(user=new_user)
            custom_user.save()
            
            return Response("Registration Successful", status=200)
        
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def profileFollowing(request, profileUsername):
    user = CustomUser.objects.get(user__username=profileUsername)
    user_following = user.following.all()
    for user in user_following:
        print(user.user_who_is_getting_followed)

    xyz = UserFollowingSerializer(user_following, many=True)    
    return Response(xyz.data, status=status.HTTP_200_OK)
            
