from django.contrib import admin
from django.urls import path, include
from posts.views import (
                        PostView,
                        post_list,
                        post_detail,
                        PostMixinView,
                        PostGenericView,
                        PostGenericDestroyView,
                        PostGenericDetailView,
                        OwnerDetailView,
                        CommentDetailView
                        )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('posts.urls')),

    path('api/post-generic/', PostGenericView.as_view(), name="post-list"),
    path('api/post-generic/owner/<int:pk>/', OwnerDetailView.as_view(), name="owner-detail"),
    path('api/post-generic/comment/<int:pk>/', CommentDetailView.as_view(), name="comment-detail"),
    path('api/post-generic/detail/<int:pk>/', PostGenericDetailView.as_view(), name="post-detail"),
    path('api/post-generic/destroy/<int:pk>/', PostGenericDestroyView.as_view(), name="post-destroy"),
    path('api/post-mixin/', PostMixinView.as_view(), name="post-list"),
    path('api/posts/', PostView.as_view(), name="post-list"),
    path('api/posts/<int:pk>', PostView.as_view(), name="post-detail"),
    path('api/post-list/', post_list, name="post-list"),
    path('api/posts/<int:pk>', post_detail, name="post-detail"),
]
