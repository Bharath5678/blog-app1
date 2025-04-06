# BlogHub - Modern Blogging Platform

BlogHub is a full-stack blogging platform built with React and Django, featuring a responsive design with light and dark mode support.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Responsive design with clean grid layouts
- Light and dark mode support
- Search functionality
- Categories and trending sections
- Modern UI with CSS Grid

## Tech Stack

- **Frontend**: React, CSS Grid, React Router
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production recommended)
- **Authentication**: JWT (JSON Web Tokens)

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Create and activate a virtual environment:

   ```
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run migrations:

   ```
   python manage.py migrate
   ```

5. Create a superuser:

   ```
   python manage.py createsuperuser
   ```

6. Add sample data (optional):

   ```
   python manage.py add_sample_blogs
   ```

7. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Deployment

### Backend Deployment (Railway)

1. Create a Railway account at [railway.app](https://railway.app)
2. Install the Railway CLI: `npm i -g @railway/cli`
3. Login to Railway: `railway login`
4. Initialize a new project: `railway init`
5. Add a PostgreSQL database: `railway add`
6. Deploy the application: `railway up`
7. Configure environment variables in the Railway dashboard

### Frontend Deployment (Vercel)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI: `npm i -g vercel`
3. Login to Vercel: `vercel login`
4. Navigate to the frontend directory: `cd frontend`
5. Deploy the application: `vercel`
6. Set environment variables in the Vercel dashboard

## License

This project is open source and available under the [MIT License](LICENSE).
