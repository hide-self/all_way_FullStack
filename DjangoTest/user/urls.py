from django.urls import path

from user.views import ViewTest_post_1, ViewTest_post_2, ViewTest_get

urlpatterns = [
    path("test_get",ViewTest_get.as_view()),

    path("test_post_1",ViewTest_post_1.as_view()),

    path("test_post_2",ViewTest_post_2.as_view())
]