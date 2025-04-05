from django.urls import path
from .views import BlogListCreate, BlogDetail, UserRegistrationView

urlpatterns = [
    path('blogs/', BlogListCreate.as_view()),
    path('blogs/<int:pk>/', BlogDetail.as_view()),
    path('users/', UserRegistrationView.as_view()),
]
