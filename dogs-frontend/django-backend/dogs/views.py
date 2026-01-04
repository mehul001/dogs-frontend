from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.db.models import Q
import json

from .models import Dog
from .serializers import DogSerializer


class DogViewSet(viewsets.ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['current_status', 'gender', 'breed', 'supplier']
    search_fields = ['name', 'breed', 'supplier', 'badge_id']

    def get_queryset(self):
        queryset = Dog.objects.all()
        
        # Handle includeDeleted parameter
        include_deleted = self.request.query_params.get('includeDeleted', 'false').lower() == 'true'
        if not include_deleted:
            queryset = queryset.filter(deleted=False)
        
        # Handle custom filter parameter
        filter_param = self.request.query_params.get('filter')
        if filter_param:
            try:
                filter_dict = json.loads(filter_param)
                for key, value in filter_dict.items():
                    if key == 'name':
                        queryset = queryset.filter(name__icontains=value)
                    elif key == 'breed':
                        queryset = queryset.filter(breed__icontains=value)
                    elif key == 'supplier':
                        queryset = queryset.filter(supplier__icontains=value)
            except json.JSONDecodeError:
                pass
        
        return queryset

    def destroy(self, request, *args, **kwargs):
        # Soft delete implementation
        instance = self.get_object()
        instance.deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def enums(self, request):
        """Return available enum values"""
        return Response({
            'status': [choice[0] for choice in Dog.STATUS_CHOICES],
            'leavingReasons': [choice[0] for choice in Dog.LEAVING_REASON_CHOICES],
        })

    @action(detail=False, methods=['get'], url_path='enums/status')
    def status_enums(self, request):
        """Return status enum values"""
        return Response([choice[0] for choice in Dog.STATUS_CHOICES])

    @action(detail=False, methods=['get'], url_path='enums/leaving-reasons')
    def leaving_reasons_enums(self, request):
        """Return leaving reasons enum values"""
        return Response([choice[0] for choice in Dog.LEAVING_REASON_CHOICES])




