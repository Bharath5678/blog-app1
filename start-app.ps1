# PowerShell script to start both servers

Write-Host "Starting Django backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver"

Write-Host "Waiting for Django to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Starting React frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "Both servers are starting. You can access:" -ForegroundColor Cyan
Write-Host "Backend: http://127.0.0.1:8000/" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000/" -ForegroundColor Cyan 