from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class CustomUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="custom_user")
    profilePic = models.TextField(blank=True,null=True)
    coverPic = models.TextField(blank=True,null=True)
    bio = models.TextField(blank=True,null=True, max_length=50)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

class Post(models.Model):
    user = models.ForeignKey(CustomUser, related_name="posts", on_delete=models.CASCADE)
    caption = models.TextField(blank=True, null=True, max_length=50)
    image = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Post by " + self.user.user.first_name + " " + self.user.user.last_name + " " + str(self.id)
    

class PostLike(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)

class PostComment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField(max_length=50, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
class UserFollowing(models.Model):
    # This field indicates the following of custom user instance
    user_who_is_following = models.ForeignKey(CustomUser, related_name="following", on_delete=models.CASCADE, blank=True, null=True)

    # This field indicates the followers of custom user instance
    user_who_is_getting_followed = models.ForeignKey(CustomUser, related_name="followers", on_delete=models.CASCADE, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return( self.user_who_is_following.user.username + " followed " + self.user_who_is_getting_followed.user.username)