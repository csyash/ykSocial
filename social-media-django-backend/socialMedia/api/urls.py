from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.index, name='endpoints'),
    path('posts/', views.posts, name='posts'),
    path('posts/<int:postID>/like', views.postLike, name='post-like'),
    path('posts/<int:postID>/comment', views.postComment, name='post-comment'),
    path('profile/<str:profileUsername>', views.profiles, name='profiles'),
    path('profile/<str:profileUsername>/follow', views.profileFollow, name='profile-follow'),
    path('profile/<str:profileUsername>/following', views.profileFollowing, name='profile-following'),
    path('nonfollow/',views.get_users_not_following),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('reg', views.register_user, name="register")
]