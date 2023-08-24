from django.contrib import admin
from .models import Post,PostComment,PostLike,CustomUser,UserFollowing

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display=['user','caption','image']

admin.site.register(Post,PostAdmin)
admin.site.register(PostComment)
admin.site.register(PostLike)
admin.site.register(CustomUser)
admin.site.register(UserFollowing)
