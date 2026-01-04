# Frontend Code Test - Setup Instructions

Welcome to the frontend code test! This document will guide you through setting up the development environment and running the application.

## Prerequisites

Before starting, you'll need to install Docker and Node.js on your local machine.

### Docker

Follow the instructions for your operating system found here: https://docs.docker.com/engine/install/.
This will install both docker and docker-compose.

### Node.js

1. Use the version manager nvm: https://github.com/nvm-sh/nvm
2. Run `nvm install` from inside this project folder and it will install the correct version of Node.js

## Getting Started

The application consists of a Django backend API (running in Docker) and an Angular frontend (running locally for development).

### Start the Backend API (Docker)

1. Navigate to the project folder in your terminal
2. Run the following command:
   ```shell
   docker compose up --build -d
   ```
This will:
- Build and start the Django backend API
- Set up the database with initial data
- Make the API available at http://localhost:8000

### Start the Frontend

```shell
# Navigate to the frontend folder:
cd dogs-frontend

# Install dependencies:
npm install

# Start the Angular development server:
npm run start
```

The frontend will be available at http://localhost:4200 with hot reload for development.

## Accessing the Application

Once everything is running:
- **Frontend (Development)**: Open your browser and go to http://localhost:4200
- **Frontend (Docker)**: If you started with `docker-compose up -d`, also available at http://localhost:3000
- **Backend API**: Available at http://localhost:8000/api (you can test with http://localhost:8000/api/dogs)

### For Django REST Framework Users

If you're familiar with Django REST framework, you can explore the database and API structure:

- **Django Admin**: http://localhost:8000/admin - Access the Django admin interface to view and manage the database directly
  - **Username**: `admin`
  - **Password**: `admin123`
- **API Browsable Interface**: http://localhost:8000/api - Explore the REST API endpoints with Django's browsable API interface
- **Dogs API**: http://localhost:8000/api/dogs - Direct access to the dogs API endpoint

The admin interface is particularly useful for:
- Viewing the database structure and relationships
- Understanding the data models and fields
- Testing API endpoints with different parameters
- Exploring the initial data that's loaded into the system

## Project Structure

```
frontend-code-test/
├── django-backend/          # Django REST API
├── dogs-frontend/           # Angular frontend
├── docker-compose.yml       # Docker configuration
├── README.md               # Project overview
└── README-Docker.md        # Docker-specific documentation
```

## What You'll Be Working On

The application is a dog management system with:
- **Frontend**: Angular application with dog listing, creation, editing, and deletion
- **Features**: Search, filtering, pagination, and status management

## 📊 Data Model

### Dog Model Fields
- `name` - Dog's name
- `breed` - Dog breed
- `supplier` - Dog supplier
- `badge_id` - Unique badge identifier
- `current_status` - Current status (In Training, In Service, Retired, Left)
- `gender` - Dog gender (Male/Female)
- `birth_date` - Dog's birth date
- `date_acquired` - When the dog was acquired
- `leaving_reason` - Reason for leaving (if applicable)
- `deleted` - Soft delete flag
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🔧 API Endpoints

The Django API provides the following endpoints:

- `GET /api/dogs` - List all dogs (paginated)
- `POST /api/dogs` - Create a new dog
- `GET /api/dogs/{id}` - Get dog details
- `PUT /api/dogs/{id}` - Update dog
- `DELETE /api/dogs/{id}` - Soft delete dog
- `GET /api/dogs/enums/status` - Get status options
- `GET /api/dogs/enums/leaving-reasons` - Get leaving reason options

### Query Parameters
- `includeDeleted=true` - Include soft-deleted dogs
- `filter={}` - JSON filter object for custom filtering
- `search` - Search across name, breed, supplier, badge_id
- `current_status`, `gender`, `breed`, `supplier` - Direct filtering

## 👨‍💼 Django Admin

- **URL**: http://localhost:8000/admin/
- **Username**: `admin`
- **Password**: `admin123`

### Creating Admin User

If you can't access the admin interface, create the admin user manually:

```bash
# Navigate to the Django backend directory
cd django-backend

# Create the admin user
python setup_admin.py
```

**Features**: Complete CRUD operations, advanced filtering, search functionality

## 🧪 Running Tests

### Development Testing (Recommended)
```bash
cd dogs-frontend
npm install
ng test                    # Run unit tests
ng test --watch           # Run tests in watch mode
ng e2e                    # Run end-to-end tests
ng build --configuration production  # Test production build
```

### Docker Testing
```bash
# Run tests inside Docker container
docker-compose exec dogs-frontend npm test
```

## 🐳 Essential Docker Commands

### Backend Only (Recommended for Development)
```bash
# Start backend API only
docker-compose up django-backend -d

# Stop backend
docker-compose down

# View backend logs
docker-compose logs django-backend

# Rebuild backend
docker-compose up django-backend -d --build
```

### Full Stack (Docker)
```bash
# Start all services (backend + frontend)
docker-compose up -d

# Stop all services
docker-compose down

# Check container status
docker-compose ps
```

## 🔧 Key Troubleshooting

### Common Issues:

1. **Docker not starting**: Make sure Docker Desktop is running and you have sufficient system resources
2. **Node.js not found**: Make sure Node.js is installed and restart your terminal
3. **npm install fails**: Check your internet connection and try clearing npm cache: `npm cache clean --force`
4. **Port conflicts**: If ports 4200 or 8000 are already in use, you can modify the ports in `docker-compose.yml` or use `ng serve --port 4201`
5. **Permission errors**: On Mac/Linux, you might need to run commands with `sudo` for Docker
6. **Backend build failures**: Try running `docker-compose down` first, then `docker-compose up --build --force-recreate`
7. **Frontend not connecting to backend**: Make sure the backend is running on port 8000 and check the API configuration in the frontend
8. **Backend not starting**: Try `docker-compose down` then `docker-compose up django-backend -d --build`
9. **Frontend not connecting**: Ensure backend is running on port 8000
10. **Port conflicts**: Use `ng serve --port 4201` for frontend or modify docker-compose.yml
11. **Admin access**: Superuser is auto-created (admin/admin123)

### Getting Help:

If you encounter issues:
1. Check that Docker Desktop is running
2. Ensure you have enough disk space (Docker images can be large)
3. Try restarting Docker Desktop and your terminal
4. Check the terminal output for specific error messages
5. Make sure both backend (Docker) and frontend (Node.js) are running
