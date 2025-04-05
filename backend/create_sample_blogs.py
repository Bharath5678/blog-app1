from blog.models import Blog
from django.contrib.auth.models import User
import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Import Django models after setting up Django


def create_sample_blogs():
    # Get the admin user (or any other user you want to be the author)
    try:
        user = User.objects.get(username='bhara')
    except User.DoesNotExist:
        print("User 'bhara' not found. Please create a user first.")
        return

    # Create sample blog posts
    sample_blogs = [
        {
            'title': 'Welcome to Our Blog',
            'content': 'This is our first blog post. We are excited to share our thoughts and ideas with you.'
        },
        {
            'title': 'The Future of Web Development',
            'content': 'Web development is constantly evolving. New frameworks and technologies are emerging every day. In this post, we explore what the future of web development might look like.'
        },
        {
            'title': 'Getting Started with Django',
            'content': 'Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. This post provides a step-by-step guide to getting started with Django.'
        },
        {
            'title': 'React vs Vue: Which One Should You Choose?',
            'content': 'React and Vue are two of the most popular JavaScript frameworks for building user interfaces. In this post, we compare the two frameworks and help you decide which one is right for your next project.'
        },
        {
            'title': 'The Importance of Responsive Design',
            'content': 'With the increasing use of mobile devices, responsive design has become more important than ever. This post explains why responsive design is crucial for modern websites.'
        }
    ]

    # Add blog posts to the database
    for blog_data in sample_blogs:
        Blog.objects.create(
            title=blog_data['title'],
            content=blog_data['content'],
            author=user
        )

    print(f"{len(sample_blogs)} sample blog posts created successfully!")


if __name__ == '__main__':
    create_sample_blogs()
