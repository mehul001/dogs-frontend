from rest_framework import serializers
from .models import Dog


class DogSerializer(serializers.ModelSerializer):
    # Map Django field names to frontend expected field names
    id = serializers.CharField(source='pk', read_only=True)
    badgeId = serializers.CharField(source='badge_id')
    birthDate = serializers.DateField(source='birth_date')
    dateAcquired = serializers.DateField(source='date_acquired')
    currentStatus = serializers.CharField(source='current_status')
    leavingDate = serializers.DateField(source='leaving_date', allow_null=True)
    leavingReason = serializers.CharField(source='leaving_reason', allow_null=True)
    kennellingCharacteristic = serializers.CharField(source='kennelling_characteristic', allow_null=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = Dog
        fields = [
            'id', 'name', 'breed', 'supplier', 'badgeId', 'gender',
            'birthDate', 'dateAcquired', 'currentStatus', 'leavingDate',
            'leavingReason', 'kennellingCharacteristic', 'deleted',
            'createdAt', 'updatedAt'
        ]

    def validate(self, data):
        # Validate that leaving fields are required for Left/Retired status
        current_status = data.get('current_status')
        if current_status in ['Left', 'Retired']:
            if not data.get('leaving_date'):
                raise serializers.ValidationError("Leaving date is required for Left/Retired dogs")
            if not data.get('leaving_reason'):
                raise serializers.ValidationError("Leaving reason is required for Left/Retired dogs")
        return data

