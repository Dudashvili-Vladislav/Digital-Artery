from django.db.models import QuerySet, F, Value, CharField
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.handlers.wsgi import WSGIRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser, MultiPartParser

from post.models import Post
from feed.models import FollowRequest
from post.serializers import PostSerializer, PostListSerializer, PostFastListSerializer
from feed.serializers import FollowRequestSerializer
from user.serializers import UserListSerializer


User = get_user_model()

class FeedTopListAPIView(ListAPIView):

    serializer_class = PostListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        #user = self.request.user
        #followers = user.following
        #follower_ids = list(followers.values_list('id', flat=True))

        return Post.objects.all().prefetch_related("user", "images").order_by('?')[:100]


class FeedTrendingListAPIView(ListAPIView):

    serializer_class = PostListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        #user = self.request.user
        #followers = user.following
        #follower_ids = list(followers.values_list('id', flat=True))

        return Post.objects.all().prefetch_related("user", "images").order_by('?')[:100]


class FeedListAPIView(ListAPIView):

    serializer_class = PostListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        page = self.request.query_params.get('page', 1)
        page = int(page)
        n_items = 24
        # user = self.request.user
        # followers = user.following
        # follower_ids = list(followers.values_list('id', flat=True))

        # return Post.objects.filter(user__in=follower_ids).prefetch_related("user", "images").order_by('-timestamp')[(page-1) * n_items:page * n_items]
        return Post.objects.prefetch_related("user", "images").order_by('-timestamp')[(page-1) * n_items:page * n_items]


class TagsAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request: WSGIRequest) -> Response:
        res = Post.objects.all().prefetch_related("user", "images").order_by('-timestamp').values_list('tags', flat=True)
        tag_list_of_list = [i.split(',') for i in res if not i == ""]
        tag_list = list(set(sum(tag_list_of_list, [])))[:10]

        return Response(tag_list)


class PostSearchListAPIView(ListAPIView):

    serializer_class = PostListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        search_str = self.request.query_params.get('search_string', '')
        page = self.request.query_params.get('page', 1)
        page = int(page)
        n_items = 24

        qs_name = Post.objects.filter(name__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_category = Post.objects.filter(category__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_tags = Post.objects.filter(tags__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_caption = Post.objects.filter(caption__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')        
        qs_res = qs_name | qs_category | qs_tags | qs_caption

        return qs_res[(page-1) * n_items:page * n_items]


class UserSearchListAPIView(ListAPIView):

    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        search_str = self.request.query_params.get('search_string', '')
        page = self.request.query_params.get('page', 1)
        page = int(page)
        n_items = 24

        qs_name = Post.objects.filter(name__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_category = Post.objects.filter(category__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_tags = Post.objects.filter(tags__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')
        qs_caption = Post.objects.filter(caption__icontains=search_str).prefetch_related("user", "images").order_by('-timestamp')        
        post_list = qs_name | qs_category | qs_tags | qs_caption
        user_id_list = list(post_list.values_list('user', flat=True))
        qs_by_post = User.objects.filter(id__in=user_id_list)

        search_str_list = search_str.split(' ')
        qs_res = qs_by_post
        for i in search_str_list:
            qs_res = qs_res | User.objects.filter(first_name__icontains=i)
            qs_res = qs_res | User.objects.filter(last_name__icontains=i)

        return qs_res[(page-1) * n_items:page * n_items]


class PostCategorySearchListAPIView(ListAPIView):

    serializer_class = PostListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        category = self.request.query_params.get('search_string', '')
        page = self.request.query_params.get('page', 1)
        page = int(page)
        n_items = 24

        return Post.objects.filter(category__icontains=category).prefetch_related("user", "images").order_by('-timestamp')[(page-1) * n_items:page * n_items]


class UserCategorySearchListAPIView(ListAPIView):

    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet:
        category = self.request.query_params.get('search_string', '')
        page = self.request.query_params.get('page', 1)
        page = int(page)
        n_items = 24

        post_list = Post.objects.filter(category__icontains=category).prefetch_related("user", "images").order_by('-timestamp')[(page-1) * n_items:page * n_items]
        user_id_list = list(post_list.values_list('user', flat=True))

        return User.objects.filter(id__in=user_id_list)


class UnfollowUserAPIView(APIView):

    permission_classes = (IsAuthenticated,)
    parser_classes = (FormParser, MultiPartParser)

    @staticmethod
    def post(request: WSGIRequest) -> Response:

        user_id = request.POST.get('user_id')
        if not user_id:
            return Response(
                {'error': 'Follow request\'s user ID not provided.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = get_object_or_404(User, id=user_id)
        request.user.unfollow(user)
        return Response({'detail': 'unfollowed'})


class FollowUserAPIView(APIView):

    """
    APIView to make a request (or directly follow is user to be followed
    has a public account) by an authenticated user.
    """

    permission_classes = (IsAuthenticated,)
    parser_classes = (FormParser, MultiPartParser)

    @staticmethod
    def post(request: WSGIRequest) -> Response:

        user_id = request.POST.get('user_id')
        if not user_id:
            return Response(
                {'error': 'Follow request\'s user ID not provided.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = get_object_or_404(User, id=user_id)
        request.user.follow(user)
        if user.private:
            return Response({'detail': 'requested'})
        else:
            return Response({'detail': 'followed'})


class FollowRequestListAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FollowRequestSerializer

    def get_queryset(self) -> QuerySet:
        return self.request.user.requests.all()


class FollowRequestActionAPIView(APIView):

    """
    APIView to accept or reject a FollowRequest by the person
    who is being requested to act upon said request.
    """

    parser_classes = (MultiPartParser,)
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def post(request: WSGIRequest) -> Response:
        try:
            action = request.POST['action']
            follow_request_id = request.POST['follow_request_id']
        except KeyError as field:
            return Response(
                {'error': f'{str(field)} not provided.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        follow_request: FollowRequest = get_object_or_404(
            FollowRequest, id=follow_request_id
        )

        resp = {'detail': 'rejected'}

        if action == '1':
            resp['detail'] = 'accepted'
            follow_request.accept()
        else:
            follow_request.reject()

        return Response(resp)
