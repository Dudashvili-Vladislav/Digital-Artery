from django.core.handlers.wsgi import WSGIRequest
from rest_framework import status
from rest_framework.generics import DestroyAPIView, RetrieveAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from post.models import Post
from post.serializers import ImageSerializer, PostModifySerializer, PostSerializer
from user.permissions import UserIsOwner


class DetailPostAPIView(RetrieveAPIView):
    lookup_url_kwarg = 'pk'
    queryset = Post.objects.all()
    lookup_field = 'id__iexact'
    serializer_class = PostSerializer


class DeletePostAPIView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostModifySerializer
    permission_classes = (IsAuthenticated, UserIsOwner)


class UpdatePostAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    @staticmethod
    def get(request: WSGIRequest, pk: int) -> Response:
        try:
            # Solves the problem of checking whether user owns post referenced.
            post = Post.objects.filter(user=request.user).get(pk=pk)
        except Post.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(PostSerializer(post).data)

    @staticmethod
    def put(request: WSGIRequest, pk: int) -> Response:

        try:
            # Solves the problem of checking whether user owns post referenced.
            post = Post.objects.filter(user=request.user).get(pk=pk)
        except Post.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Provides a list of ids for images to be deleted.
        to_delete = set(map(int, request.POST.getlist('to_delete')))

        # Provides a list of additional (or replacement) images to be uploaded.
        additional_images = request.FILES.getlist('images')

        post_images = post.images.all()
        post_images_count = post_images.count()

        final_images_count = post_images_count - len(to_delete) + len(additional_images)

        if final_images_count > 5 or final_images_count <= 0:
            # Check if the difference between the number of images requested to be deleted
            # and the total number of images currently in post added with the total number
            # new images to be uploaded lies between 0 and 5.
            return Response(
                {'detail': 'Cannot have post with 0 images.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif to_delete.issubset(set(post_images.values_list('pk', flat=True))):
            # Default case if everything goes right since only two situations can evaluate
            # the above clause to be true -
            #   1. Either no new images were provided and thus an empty set will always be
            #      a subset to all the images already existing in the post OR
            #   2. The ids that were provided in to_delete were valid ids that belong to the
            #      id list of the images reversely to the post.

            # Bulk delete images if any.
            post_images.filter(id__in=to_delete).delete()

            # Upload images if any.
            for image in additional_images:
                image_serializer = ImageSerializer(
                    data={'file': image, 'post': post.id}
                )
                if image_serializer.is_valid():
                    image_serializer.save()
                else:
                    return Response(
                        {'error': 'Invalid image data.'},
                        status=status.HTTP_409_CONFLICT,
                    )
            else:
                # Everything has gone right so far and a sanitary update of caption is left.
                if request.POST.get('caption', False) \
                        or request.POST.get('name', False) \
                        or request.POST.get('external_url', False) \
                        or request.POST.get('tags', False) \
                        or request.POST.get('category', False):
                    post.caption = request.POST['caption']
                    post.name = request.POST['name']
                    post.url = request.POST['external_url']
                    post.tags = request.POST['tags']
                    post.category = request.POST['category']
                    post.save()
                return Response({'success': 'Updated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)


class CreatePostAPIView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')

        response = {'error': self.validate(len(images))}
        post = PostModifySerializer(
            data=dict(
                user=request.user.id,
                name=request.POST.get('name', ''),
                caption=request.POST.get('caption', ''),
                external_url=request.POST.get('external_url', ''),
                tags=request.POST.get('tags', ''),
                category=request.POST.get('category', ''),
            )
        )

        if not post.is_valid():
            response['error'].append('Invalid post data.')
            return self.error(response)

        post = post.save()
        for image in images:
            image_serializer = ImageSerializer(
                data={'file': image, 'post': post.id}
            )

            if not image_serializer.is_valid():
                response['error'].append('Invalid image data.')
                break
            image_serializer.save()
        else:
            del response['error']
            response = PostSerializer(post).data

        return Response(
            response,
            status=status.HTTP_406_NOT_ACCEPTABLE if 'error' in response else status.HTTP_201_CREATED,
        )

    def validate(self, len_images):
        error = []

        if len_images == 0:
            error.append('Requires at least one image.')
        elif len_images > 5:
            error.append('Can only accept upto five images.')

        return error

    def error(self, response, status=status.HTTP_406_NOT_ACCEPTABLE):
        return Response(
            response,
            status=status
        )
