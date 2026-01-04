from django.db import models
from django.utils import timezone


class Dog(models.Model):
    STATUS_CHOICES = [
        ('In Training', 'In Training'),
        ('In Service', 'In Service'),
        ('Retired', 'Retired'),
        ('Left', 'Left'),
    ]
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    
    LEAVING_REASON_CHOICES = [
        ('Transferred', 'Transferred'),
        ('Retired (Put Down)', 'Retired (Put Down)'),
        ('KIA', 'KIA'),
        ('Rejected', 'Rejected'),
        ('Retired (Re-housed)', 'Retired (Re-housed)'),
        ('Died', 'Died'),
    ]

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    supplier = models.CharField(max_length=100)
    badge_id = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    birth_date = models.DateField()
    date_acquired = models.DateField()
    current_status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    leaving_date = models.DateField(null=True, blank=True)
    leaving_reason = models.CharField(max_length=50, choices=LEAVING_REASON_CHOICES, null=True, blank=True)
    kennelling_characteristic = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.badge_id})"




