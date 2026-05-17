@echo off
REM AIDIYFYS Job Portal - Start Both Frontend and Backend
REM This script opens new terminals for Backend and Frontend

echo.
echo ========================================
echo AIDIYFYS Job Portal - Full Stack Setup
echo ========================================
echo.

echo [1] Starting Backend Server...
echo.
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak

echo [2] Starting Frontend Server...
echo.
start cmd /k "cd AIDIYFYS-Jobportal-main && npm start"

echo.
echo ========================================
echo Both servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Make sure MongoDB is running!
echo.
