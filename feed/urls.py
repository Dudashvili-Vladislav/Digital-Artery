from django.urls import path

from feed.views import (
    FeedListAPIView,
    FeedTopListAPIView,
    FeedTrendingListAPIView,
    TagsAPIView,
    PostSearchListAPIView,
    UserSearchListAPIView,
    PostCategorySearchListAPIView,
    UserCategorySearchListAPIView,
    FollowUserAPIView,
    UnfollowUserAPIView,
    FollowRequestListAPIView,
    FollowRequestActionAPIView,
)

app_name = 'feed'

urlpatterns = [
    path('posts/', FeedListAPIView.as_view(), name='feed'),
    path('posts_top/', FeedTopListAPIView.as_view(), name='feed_top'),
    path('posts_trending/', FeedTrendingListAPIView.as_view(), name='feed_trending'),
    path('tags/', TagsAPIView.as_view(), name='tags'),
    path('search_post/', PostSearchListAPIView.as_view(), name='search_post'),
    path('search_user/', UserSearchListAPIView.as_view(), name='search_user'),
    path('category_search_post/', PostCategorySearchListAPIView.as_view(), name='category_search_post'),
    path('category_search_user/', UserCategorySearchListAPIView.as_view(), name='category_search_user'),
    path('follow/', FollowUserAPIView.as_view(), name='follow'),
    path('unfollow/', UnfollowUserAPIView.as_view(), name='unfollow'),
    path('requests/', FollowRequestListAPIView.as_view(), name='list'),
    path('action/', FollowRequestActionAPIView.as_view(), name='action'),
]
