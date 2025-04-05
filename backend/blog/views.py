from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer, UserRegistrationSerializer
from rest_framework.pagination import PageNumberPagination


class BlogPagination(PageNumberPagination):
    page_size = 5


class BlogListCreate(generics.ListCreateAPIView):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    pagination_class = BlogPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_permissions(self):
        return [permissions.IsAuthenticated()] if self.request.method == 'POST' else []

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print(f"Error creating blog: {str(e)}")  # For debugging
            return Response(
                {"detail": f"Failed to create blog: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )


class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()] if self.request.method in ['PUT', 'DELETE'] else []


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
