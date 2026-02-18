# Support Insights Hub API

A RESTful API built with ASP.NET Core and C# .NET 9.0 for the Support Insights Hub application. This backend provides authentication, user management, ticket tracking, and dashboard analytics.

## 🚀 Technologies Used

### Core Framework
- **ASP.NET Core 9.0** - High-performance web framework
- **C# 11** - Modern, type-safe programming language
- **.NET 9.0 SDK** - Latest .NET runtime and SDK

### Authentication & Security
- **JWT Bearer Authentication** - Secure token-based authentication
- **BCrypt.Net** - Password hashing and verification
- **ASP.NET Core Identity** - User authentication and authorization
- **Role-Based Authorization** - Admin, Agent, and Customer roles

### Database
- **Entity Framework Core 9.0** - Object-Relational Mapper (ORM)
- **In-Memory Database** - For development and testing (easily switchable to SQL Server, PostgreSQL, MySQL)

### API Features
- **OpenAPI/Swagger** - API documentation and testing
- **CORS** - Cross-Origin Resource Sharing support
- **RESTful Architecture** - Standard HTTP methods and status codes

## 📋 Prerequisites

- **.NET 9.0 SDK** or higher - [Download](https://dotnet.microsoft.com/download)

Verify installation:
```bash
dotnet --version
# Should show 9.0.x or higher
```

## 🛠️ Installation

1. **Navigate to the API directory**
   ```bash
   cd backend
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Build the project**
   ```bash
   dotnet build
   ```

## 🚀 Running the API

### Development Mode

Start the development server:

```bash
dotnet run
```

Or with hot reload:

```bash
dotnet watch run
```

The API will be available at:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`

### Production Mode

Build and run in production:

```bash
dotnet build --configuration Release
dotnet run --configuration Release
```

## 📁 Project Structure

```
backend/
├── Controllers/           # API endpoints
│   ├── AuthController.cs        # Authentication endpoints
│   ├── UsersController.cs       # User management
│   ├── TicketsController.cs     # Ticket operations
│   └── DashboardController.cs   # Dashboard stats
├── Models/               # Data models
│   ├── User.cs                  # User entity
│   └── Ticket.cs                # Ticket entity
├── DTOs/                 # Data Transfer Objects
│   ├── LoginRequestDto.cs
│   ├── LoginResponseDto.cs
│   └── UpdateUserDto.cs
├── Services/             # Business logic
│   └── AuthService.cs           # Authentication service
├── Data/                 # Database context
│   └── ApplicationDbContext.cs  # EF Core DbContext
├── Program.cs            # Application entry point
├── appsettings.json      # Configuration
└── SupportInsightsHub.Api.csproj # Project file
```

## 🔌 API Endpoints

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/logout` - User logout

### Users
- **GET** `/api/users` - Get all users (requires authentication)
- **GET** `/api/users/{id}` - Get user by ID (requires authentication)
- **PUT** `/api/users/{id}` - Update user (requires Admin role)
- **DELETE** `/api/users/{id}` - Delete user (requires Admin role)

### Tickets
- **GET** `/api/tickets` - Get all tickets (requires authentication)
- **GET** `/api/tickets/{id}` - Get ticket by ID (requires authentication)
- **POST** `/api/tickets` - Create new ticket (requires authentication)
- **PUT** `/api/tickets/{id}` - Update ticket (requires authentication)
- **DELETE** `/api/tickets/{id}` - Delete ticket (requires Admin or Agent role)

### Dashboard
- **GET** `/api/dashboard/stats` - Get dashboard statistics (requires authentication)
- **GET** `/api/dashboard/recent-tickets` - Get recent tickets (requires authentication)

## 🔐 Default User Accounts

The API seeds the following test accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@company.com | admin123 |
| **Agent** | agent@company.com | agent123 |
| **Agent** | carol.white@email.com | password123 |
| **Customer** | customer@company.com | customer123 |

## 🔑 JWT Configuration

JWT settings are configured in `appsettings.json`:

```json
{
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "SupportInsightsHub.Api",
    "Audience": "SupportInsightsHub.Client"
  }
}
```

**⚠️ Important**: Change the `SecretKey` in production to a strong, randomly generated key!

## 🔒 Authentication Flow

1. **Login**: Send POST request to `/api/auth/login` with email and password
2. **Receive Token**: Get JWT token in response
3. **Use Token**: Include token in `Authorization` header for subsequent requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Example Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "admin123"
  }'
```

### Example Response

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "U001",
    "name": "Alice Johnson",
    "email": "admin@company.com",
    "role": "Admin"
  }
}
```

## 🌐 CORS Configuration

CORS is configured to allow requests from the frontend:
- `http://localhost:5173` (Vite default port)
- `http://localhost:3000` (React default port)

To add more origins, update `Program.cs`:

```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "https://yourdomain.com")
```

## 📊 Database

### Current Setup
The API uses **Entity Framework Core In-Memory Database** for development. Data is seeded automatically on startup.

### Switching to SQL Server/PostgreSQL/MySQL

1. **Install the appropriate NuGet package**:
   ```bash
   # For SQL Server
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   
   # For PostgreSQL
   dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
   
   # For MySQL
   dotnet add package Pomelo.EntityFrameworkCore.MySql
   ```

2. **Update `Program.cs`**:
   ```csharp
   // Replace UseInMemoryDatabase with:
   builder.Services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
   ```

3. **Add connection string to `appsettings.json`**:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=SupportInsightsHub;Trusted_Connection=True;"
     }
   }
   ```

4. **Create and apply migrations**:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

## 🧪 Testing the API

### Using OpenAPI/Swagger

Navigate to `https://localhost:5001/openapi/v1.json` when running in development mode.

### Using curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"admin123"}'

# Get all users (replace TOKEN with your JWT)
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman or Insomnia

1. Import the OpenAPI spec
2. Set up environment variables for the base URL and token
3. Test all endpoints

## 🔧 Configuration

### Environment Variables

You can override settings using environment variables:

```bash
export JwtSettings__SecretKey="YourNewSecretKey"
export JwtSettings__Issuer="YourIssuer"
```

### Logging

Logging levels can be configured in `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

## 📦 Deployment

### Publishing the Application

```bash
dotnet publish -c Release -o ./publish
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["SupportInsightsHub.Api.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SupportInsightsHub.Api.dll"]
```

Build and run:
```bash
docker build -t support-insights-hub-api .
docker run -p 5000:80 support-insights-hub-api
```

## 🔐 Security Best Practices

1. **Change JWT Secret Key** in production
2. **Use HTTPS** in production
3. **Implement Rate Limiting** to prevent abuse
4. **Add Input Validation** for all endpoints
5. **Use Strong Passwords** (consider password policy enforcement)
6. **Implement Refresh Tokens** for extended sessions
7. **Add API Versioning** for future compatibility
8. **Enable Request Logging** for audit trails

## 🐛 Troubleshooting

### Port Already in Use
If port 5000/5001 is in use, specify a different port:
```bash
dotnet run --urls "http://localhost:5050;https://localhost:5051"
```

### JWT Token Invalid
- Verify the secret key matches between frontend and backend
- Check token expiration time
- Ensure Authorization header format: `Bearer <token>`

### CORS Errors
- Verify the frontend URL is in the CORS policy
- Check that credentials are included in frontend requests

## 🤝 Integration with Frontend

To connect the React frontend to this API:

1. **Update frontend API base URL** in a config file or environment variable
2. **Update AuthContext** to call real API endpoints
3. **Handle JWT tokens** in frontend (store in localStorage/sessionStorage)
4. **Add Authorization headers** to all authenticated requests

Example frontend service:

```typescript
const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

## 📚 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [JWT Authentication](https://jwt.io/)
- [RESTful API Design](https://restfulapi.net/)

## 📝 License

This project is private and proprietary.

## 💻 Development Commands

```bash
# Run with hot reload
dotnet watch run

# Run tests (if tests are added)
dotnet test

# Clean build artifacts
dotnet clean

# Format code
dotnet format

# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update
```

## 📧 Support

For support and questions, please contact the development team.
