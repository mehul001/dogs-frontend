#!/usr/bin/env python
"""
Simple script to create Django admin user
Run this after setting up the Django backend
"""
import os
import sys
import django

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dogs_api.settings')
django.setup()

from django.contrib.auth.models import User

def create_admin():
    username = 'admin'
    email = 'admin@example.com'
    password = 'admin123'

    if User.objects.filter(username=username).exists():
        print(f'Admin user "{username}" already exists')
    else:
        User.objects.create_superuser(username, email, password)
        print(f'Successfully created admin user "{username}" with password "{password}"')

if __name__ == '__main__':
    create_admin()
