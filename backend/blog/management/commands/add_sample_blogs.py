from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from blog.models import Blog


class Command(BaseCommand):
    help = 'Creates sample blog posts for testing'

    def handle(self, *args, **options):
        # Check if user exists, otherwise create it
        username = 'testuser'

        try:
            user = User.objects.get(username=username)
            self.stdout.write(self.style.SUCCESS(
                f"Using existing user: {username}"))
        except User.DoesNotExist:
            # Create a test user if it doesn't exist
            user = User.objects.create_user(
                username=username,
                email='test@example.com',
                password='password123'
            )
            self.stdout.write(self.style.SUCCESS(
                f"Created new user: {username}"))

        # Sample blog posts
        sample_blogs = [
            {
                'title': 'Getting Started with Django REST Framework',
                'content': 'Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. It provides tools for authentication, serialization, and much more. In this post, we\'ll explore the basics of DRF and how to get started with it.'
            },
            {
                'title': 'Building a Blog with React and Django',
                'content': 'In this tutorial, we\'ll walk through the process of building a modern blog application using React for the frontend and Django for the backend. We\'ll cover everything from setting up the project to deploying it to production.'
            },
            {
                'title': 'The Power of JWT Authentication',
                'content': 'JSON Web Tokens (JWT) provide a compact and self-contained way for securely transmitting information between parties. In this post, we\'ll explore how JWT works and how to implement it in your web applications.'
            }
        ]

        # Create blogs
        blogs_created = 0
        for blog in sample_blogs:
            Blog.objects.create(
                title=blog['title'],
                content=blog['content'],
                author=user
            )
            blogs_created += 1
            self.stdout.write(self.style.SUCCESS(
                f"Created blog: {blog['title']}"))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {blogs_created} sample blogs"))
