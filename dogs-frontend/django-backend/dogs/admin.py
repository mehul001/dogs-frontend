from django.contrib import admin
from .models import Dog


@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):
    list_display = ['name', 'breed', 'supplier', 'badge_id', 'current_status', 'deleted']
    list_filter = ['current_status', 'gender', 'breed', 'supplier', 'deleted']
    search_fields = ['name', 'breed', 'supplier', 'badge_id']
    readonly_fields = ['created_at', 'updated_at']




