from django.urls import path

from feed.views import (
    FeedAPIView,
    FeedTopAPIView,
    FeedTrendingAPIView,
    FollowUserAPIView,
    UnfollowUserAPIView,
    FollowRequestListAPIView,
    FollowRequestActionAPIView,
)

app_name = 'feed'

urlpatterns = [
    path('posts/', FeedAPIView.as_view(), name='feed'),
    path('posts_top/', FeedTopAPIView.as_view(), name='feed_top'),
    path('posts_trending/', FeedTrendingAPIView.as_view(), name='feed_trending'),
    path('follow/', FollowUserAPIView.as_view(), name='follow'),
    path('unfollow/', UnfollowUserAPIView.as_view(), name='unfollow'),
    path('requests/', FollowRequestListAPIView.as_view(), name='list'),
    path('action/', FollowRequestActionAPIView.as_view(), name='action'),
]
