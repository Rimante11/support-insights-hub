# Support Insights Hub

TO RUN APPLICSTION: 
- **cd backend**
- **dotnet run** 
Backend will run on http://localhost:5000
- **cd frontend**
- **npm run dev** on http://localhost:8081/ 

A modern full-stack support dashboard application with a React TypeScript frontend and ASP.NET Core C# backend, featuring user management, ticket tracking, and performance analytics.

## 🏗️ Architecture

This project consists of two main components:

- **Frontend** (`frontend/`) - React + TypeScript + Vite
- **Backend API** (`backend/`) - ASP.NET Core + C# + Entity Framework

## 🚀 Technologies Used

### Frontend Technologies

### Core Framework & Language
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **React** (v18.3.1) - UI component library
- **Vite** (v5.4.19) - Fast build tool and development server
- **Node.js & npm** - JavaScript runtime and package manager

### Routing & Navigation
- **React Router DOM** (v6.30.1) - Client-side routing

### UI & Styling
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** (v0.462.0) - Icon library
- **next-themes** (v0.3.0) - Dark/light theme support
- **tailwindcss-animate** - Animation utilities

### Charts & Data Visualization
- **Recharts** (v2.15.4) - Composable charting library

### Forms & Validation
- **React Hook Form** (v7.61.1) - Performant form state management
- **Zod** (v3.25.76) - TypeScript-first schema validation
- **@hookform/resolvers** (v3.10.0) - Form validation resolvers

### State Management
- **TanStack Query / React Query** (v5.83.0) - Server state management
- **React Context API** - Authentication state management

### Testing
- **Vitest** (v3.2.4) - Unit testing framework
- **Testing Library** (React v16.0.0, Jest DOM v6.6.0) - Component testing
- **jsdom** (v20.0.3) - DOM implementation for Node.js

### Development Tools
- **ESLint** (v9.32.0) - Code linting
- **TypeScript ESLint** (v8.38.0) - TypeScript linting rules
- **PostCSS** (v8.5.6) - CSS transformations
- **Autoprefixer** (v10.4.21) - Automatic vendor prefixes

### Additional Libraries
- **date-fns** (v3.6.0) - Date utility library
- **clsx** & **tailwind-merge** - Conditional className utilities
- **Sonner** (v1.7.4) - Toast notifications
- **cmdk** (v1.1.1) - Command menu component
- **Vaul** (v0.9.9) - Drawer component

### Backend Technologies
- **ASP.NET Core 9.0** - Web API framework
- **C# 11** - Backend programming language
- **Entity Framework Core 9.0** - ORM for database operations
- **JWT Bearer Authentication** - Secure token-based auth
- **BCrypt.Net** - Password hashing
- **In-Memory Database** - Easily switchable to SQL Server/PostgreSQL/MySQL

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### For Frontend:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

Optional: You can also use Bun as a faster alternative:
- **Bun** (v1.0 or higher) - [Installation Guide](https://bun.sh/docs/installation)
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

### For Backend:
- **.NET 9.0 SDK** or higher - [Download](https://dotnet.microsoft.com/download)
  ```bash
  # Verify installation
  dotnet --version
  ```

## 🛠️ Installation

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Or if using Bun:
   ```bash
   bun install
   ```

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd ../backend
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Build the project**
   ```bash
   dotnet build
   ```

## 🚀 Getting Started

### Running Both Frontend and Backend

**Option 1: Run in separate terminals**

Terminal 1 (Backend):
```bash
cd backend
dotnet run --urls "http://localhost:5000"
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Option 2: Background process**
```bash
# Start backend in background
cd backend && dotnet run --urls "http://localhost:5000" &

# Start frontend
cd frontend && npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### Frontend Only (with Mock Data)

If you want to run just the frontend with mock data:

```bash
cd frontend
npm run dev
```

Or with Bun (if installed):
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Default Login Credentials

The application includes mock authentication with the following test accounts:

- **Admin Account**
  - Email: `admin@company.com`
  - Password: `admin123`
  - Role: Admin (full access, can edit user roles)

- **Agent Account**
  - Email: `agent@company.com`
  - Password: `agent123`
  - Role: Agent (limited access, cannot edit user roles)

- **Customer Account**
  - Email: `customer@company.com`
  - Password: `customer123`
  - Role: Customer (basic access)

## 📜 Available Scripts

### Frontend Scripts
- **`npm run dev`** - Start frontend development server
- **`npm run build`** - Build frontend for production
- **`npm run build:dev`** - Build in development mode
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run test`** - Run tests once
- **`npm run test:watch`** - Run tests in watch mode

*Note: You can also use `bun` instead of `npm` if you have Bun installed.*

### Backend Scripts
- **`dotnet run`** - Start backend API server
- **`dotnet watch run`** - Start API with hot reload
- **`dotnet build`** - Build the API
- **`dotnet test`** - Run API tests

## 📁 Project Structure

```
dashboarrd_hub/
├── frontend/                     # Frontend (React + TypeScript)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   └── ...               # Feature components
│   │   ├── contexts/             # React Context providers
│   │   ├── data/                 # Mock data (for standalone mode)
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions
│   │   ├── pages/                # Page components
│   │   ├── test/                 # Test setup and utilities
│   │   ├── App.tsx               # Main App component
│   │   └── main.tsx              # Application entry point
│   ├── package.json              # Frontend dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── vite.config.ts            # Vite configuration
│   └── tailwind.config.ts        # Tailwind CSS configuration
│
└── backend/                      # Backend (ASP.NET Core + C#)
    ├── Controllers/               # API endpoints
    │   ├── AuthController.cs     # Authentication
    │   ├── UsersController.cs    # User management
    │   ├── TicketsController.cs  # Ticket operations
    │   └── DashboardController.cs # Dashboard stats
    ├── Models/                    # Data models
    ├── DTOs/                      # Data Transfer Objects
    ├── Services/                  # Business logic
    ├── Data/                      # Database context
    ├── Program.cs                 # Application entry point
    ├── appsettings.json          # Configuration
    └── SupportInsightsHub.Api.csproj # Project file
```

## ✨ Features

- **Dashboard Overview** - KPI cards, ticket trends, and activity feeds
- **User Management** - View, edit, and manage users with role-based access control
- **Ticket System** - Track and manage support tickets
- **Analytics Charts** - Performance metrics and data visualization
- **Role-Based Access** - Admin, Agent, and Customer roles with different permissions
- **JWT Authentication** - Secure login/logout with real JWT tokens from backend API
- **RESTful API** - Full-featured backend API with C# .NET
- **Dark/Light Theme** - Toggle between themes
- **Responsive Design** - Mobile-friendly interface

## 🔌 API Endpoints

The backend provides the following RESTful API endpoints:

### Authentication
- `POST /api/auth/login` - User login (returns JWT token)
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user (Admin only)
- `DELETE /api/users/{id}` - Delete user (Admin only)

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/{id}` - Get ticket by ID
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/{id}` - Update ticket
- `DELETE /api/tickets/{id}` - Delete ticket (Admin/Agent only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-tickets` - Get recent tickets

For detailed API documentation, see the [Backend README](../backend/README.md).

## 🔐 Authentication & Permissions

The application uses role-based access control (RBAC):

- **Admin**: Full access to all features, can edit user roles
- **Agent**: Can view and manage tickets, cannot edit user roles
- **Customer**: Basic access to their own tickets

Only users with the **Admin** role can modify user roles in the Users table.

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### Clear Cache
If you encounter build issues, try clearing the cache:
```bash
rm -rf node_modules .vite
bun install
```

### TypeScript Errors
Make sure all dependencies are installed and try restarting your IDE's TypeScript server.

## 📧 Support

For support and questions, please contact the development team.
