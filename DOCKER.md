# Docker Deployment Guide

This guide explains how to run the Support Insights Hub application using Docker and Docker Compose.

## 📋 Prerequisites

- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- At least 4GB of RAM allocated to Docker
- At least 10GB of free disk space

Verify Docker is installed:
```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

Run both frontend and backend together:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

The application will be available at:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

### Option 2: Build and Run Individually

**Backend:**
```bash
cd backend
docker build -t support-insights-backend .
docker run -p 5000:5000 support-insights-backend
```

**Frontend:**
```bash
cd frontend
docker build -t support-insights-frontend .
docker run -p 8080:80 support-insights-frontend
```

## 🛠️ Docker Compose Commands

### Start Services
```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# Start without building
docker-compose up
```

### Stop Services
```bash
# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers, networks, and volumes
docker-compose down -v
```

### View Logs
```bash
# View all logs
docker-compose logs

# Follow logs (live)
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache
```

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
```

## 📁 Docker Configuration Files

### docker-compose.yml
Main orchestration file that defines:
- Services (frontend and backend)
- Port mappings
- Environment variables
- Networks
- Health checks

### Backend Dockerfile
- Uses multi-stage build for optimization
- Base image: `mcr.microsoft.com/dotnet/sdk:9.0` (build)
- Runtime image: `mcr.microsoft.com/dotnet/aspnet:9.0`
- Exposes port 5000

### Frontend Dockerfile
- Uses multi-stage build with Node.js and nginx
- Build stage: Node.js 18 Alpine
- Runtime stage: nginx Alpine
- Exposes port 80 (mapped to 8080 on host)

### .dockerignore Files
Exclude unnecessary files from Docker builds:
- node_modules
- build artifacts
- IDE files
- logs

## 🔧 Environment Variables

Configure in `docker-compose.yml`:

**Backend:**
```yaml
environment:
  - ASPNETCORE_ENVIRONMENT=Production
  - ASPNETCORE_URLS=http://+:5000
  - JwtSettings__SecretKey=YourSecretKey
  - JwtSettings__Issuer=SupportInsightsHub.Api
  - JwtSettings__Audience=SupportInsightsHub.Client
```

**Frontend:**
```yaml
environment:
  - VITE_API_URL=http://localhost:5000
```

## 🌐 Port Configuration

Default ports (can be changed in docker-compose.yml):
- Frontend: `8080:80` (host:container)
- Backend: `5000:5000` (host:container)

To change ports, edit `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Frontend on port 3000
  - "4000:5000"  # Backend on port 4000
```

## 🔍 Health Checks

The backend service includes a health check:
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3
- Start period: 40 seconds

Check service health:
```bash
docker-compose ps
```

## 🐛 Troubleshooting

### Port Already in Use
If ports 5000 or 8080 are in use:

1. Change ports in `docker-compose.yml`
2. Or stop the conflicting service:
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Container Won't Start
View detailed logs:
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Image Build Fails
Clear Docker cache and rebuild:
```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

### Connection Refused Between Services
Ensure services are on the same network:
```bash
docker network ls
docker network inspect dashboarrd_hub_support-insights-network
```

### Out of Disk Space
Clean up Docker resources:
```bash
# Remove unused containers, networks, images
docker system prune

# Remove all unused images
docker image prune -a

# Remove all stopped containers
docker container prune

# Remove all unused volumes
docker volume prune
```

## 📊 Monitoring

### View Running Containers
```bash
docker ps

# Or with docker-compose
docker-compose ps
```

### View Resource Usage
```bash
docker stats

# Or for specific container
docker stats support-insights-backend
docker stats support-insights-frontend
```

### Inspect Containers
```bash
# Get container details
docker inspect support-insights-backend

# View container logs
docker logs support-insights-backend
docker logs -f support-insights-frontend  # Follow logs
```

## 🔒 Security Best Practices

1. **Change Default Secrets**
   - Update JWT secret key in production
   - Use Docker secrets for sensitive data

2. **Use Specific Image Tags**
   - Avoid `latest` tags in production
   - Pin to specific versions

3. **Limit Container Resources**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             cpus: '1'
             memory: 512M
   ```

4. **Run as Non-Root User**
   - Already implemented in frontend (nginx)
   - Consider for backend in production

## 🚢 Production Deployment

For production, consider:

1. **Use Environment-Specific Compose Files**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
   ```

2. **Enable HTTPS**
   - Add reverse proxy (nginx/Traefik)
   - Configure SSL certificates

3. **Use External Database**
   - Replace In-Memory database with PostgreSQL/SQL Server
   - Add database service to docker-compose.yml

4. **Add Logging and Monitoring**
   - Integrate with ELK stack or Prometheus
   - Configure log drivers

5. **Set Up CI/CD**
   - Automate builds with GitHub Actions
   - Push images to Docker Hub or private registry

## 🔄 Development Mode

For development with hot reload:

Create `docker-compose.dev.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      target: build
    volumes:
      - ./backend:/src
    command: dotnet watch run

  frontend:
    build:
      context: ./frontend
      target: build
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
```

Run with:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 📝 Default Credentials

When accessing the application:
- **Admin**: admin@company.com / admin123
- **Agent**: agent@company.com / agent123
- **Customer**: customer@company.com / customer123

## 🆘 Getting Help

If you encounter issues:
1. Check container logs: `docker-compose logs`
2. Verify service health: `docker-compose ps`
3. Restart services: `docker-compose restart`
4. Rebuild from scratch: `docker-compose down && docker-compose up --build`

For more information:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 📧 Support

For additional support, refer to the main project documentation or contact the development team.
