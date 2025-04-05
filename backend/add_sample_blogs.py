#!/usr/bin/env python
from blog.models import Blog
from django.contrib.auth.models import User
import os
import django
import sys

# Ensure the correct Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Now imports should work


def create_sample_blogs():
    # Check if user exists, otherwise create it
    username = 'testuser'

    try:
        user = User.objects.get(username=username)
        print(f"Using existing user: {username}")
    except User.DoesNotExist:
        # Create a test user if it doesn't exist
        user = User.objects.create_user(
            username=username,
            email='test@example.com',
            password='password123'
        )
        print(f"Created new user: {username}")

    # Check if there are existing blogs
    if Blog.objects.count() > 0:
        print(
            f"There are already {Blog.objects.count()} blogs in the database.")
        choice = input("Do you want to add more sample blogs? (y/n): ")
        if choice.lower() != 'y':
            return

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
        print(f"Created blog: {blog['title']}")

    print(f"Successfully created {blogs_created} sample blogs")


if __name__ == '__main__':
    create_sample_blogs()
