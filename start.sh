#!/bin/bash

# Support Insights Hub - Start Script
# This script starts both the frontend and backend services

echo "🚀 Starting Support Insights Hub..."
echo ""

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed. Please install .NET 9.0 or higher."
    echo "   Download from: https://dotnet.microsoft.com/download"
    exit 1
fi

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "⚠️  Bun is not installed. Checking for npm..."
    if ! command -v npm &> /dev/null; then
        echo "❌ Neither Bun nor npm is installed. Please install one of them."
        echo "   Bun: https://bun.sh"
        echo "   Node.js/npm: https://nodejs.org"
        exit 1
    fi
    USE_NPM=true
else
    USE_NPM=false
fi

echo "✅ Prerequisites check passed"
echo ""

# Start backend in background
echo "🔧 Starting Backend API (http://localhost:5000)..."
cd backend
dotnet run --urls "http://localhost:5000" > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ Backend failed to start. Check backend.log for details."
    exit 1
fi

echo "✅ Backend API started (PID: $BACKEND_PID)"
echo ""

# Start frontend
echo "🎨 Starting Frontend (http://localhost:5173)..."
cd frontend

if [ "$USE_NPM" = true ]; then
    npm run dev
else
    bun run dev
fi

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Wait for frontend
wait
