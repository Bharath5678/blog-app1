@echo off
echo Starting Django backend server...
start cmd /k "cd backend && python manage.py runserver"

echo Waiting for Django to start...
timeout /t 5

echo Starting React frontend...
start cmd /k "cd frontend && npm start"

echo Both servers are starting. You can access:
echo Backend: http://127.0.0.1:8000/
echo Frontend: http://localhost:3000/ 