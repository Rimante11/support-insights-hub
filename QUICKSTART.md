# Support Insights Hub - Quick Start Guide

This project consists of two main components:
- **Frontend**: React + TypeScript
- **Backend API**: ASP.NET Core + C#

## 🚀 Quick Start

### Option 1: Using Docker (Easiest - Recommended)

If you have Docker Desktop installed:

```bash
docker-compose up --build
```

Access the application:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

See [DOCKER.md](DOCKER.md) for detailed Docker documentation.

### Option 2: Using the Start Script

Make the script executable and run it:

```bash
chmod +x start.sh
./start.sh
```

This will start both the backend and frontend automatically.
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Option 3: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run --urls "http://localhost:5000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# or: bun run dev (if Bun is installed)
```

## 📝 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Agent | agent@company.com | agent123 |
| Customer | customer@company.com | customer123 |

## 🔗 URLs

**Local Development (npm/dotnet):**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

**Docker:**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

**API Documentation:**
- **OpenAPI Spec**: http://localhost:5000/openapi/v1.json

## 📚 Documentation

- [Docker Guide](DOCKER.md) - **Start here for Docker setup**
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 🛠️ First Time Setup

### For Docker Users

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop/
   - Verify: `docker --version`

2. **Run the application**
   ```bash
   docker-compose up --build
   ```

3. **Access at** http://localhost:8080

### For Local Development

If this is your first time running the project without Docker:

1. **Install .NET 9.0 SDK**
   ```bash
   # Check if installed
   dotnet --version
   ```

2. **Install Node.js**
   ```bash
   # Check if installed
   node --version
   npm --version
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Restore Backend Dependencies**
   ```bash
   cd backend
   dotnet restore
   dotnet build
   cd ..
   ```

5. **Start the Application**
   ```bash
   ./start.sh
   ```

## ⚡ Features

- ✅ JWT Authentication
- ✅ Role-Based Access Control (Admin, Agent, Customer)
- ✅ User Management
- ✅ Ticket System
- ✅ Dashboard Analytics
- ✅ Dark/Light Theme
- ✅ Responsive Design

## 🐛 Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

**Backend:**
```bash
dotnet run --urls "http://localhost:5050"
```

**Frontend:**
Update `vite.config.ts` or use:
```bash
bun run dev --port 5174
```

### Backend Not Starting

Check `backend.log` for error messages:
```bash
cat backend.log
```

### Frontend Build Errors

Clear node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules
npm install
```

## 📧 Support

For issues and questions, please check the individual README files:
- [Frontend README](frontend/README.md)
- [Backend API README](backend/README.md)
