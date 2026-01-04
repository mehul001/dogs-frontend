# Django Backend Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create static files directory
RUN mkdir -p /app/staticfiles

# Run migrations, create admin, and collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Start server with admin creation
CMD ["sh", "-c", "python manage.py migrate && python manage.py create_admin && python manage.py loaddata initial_data.json && python manage.py runserver 0.0.0.0:8000"]




