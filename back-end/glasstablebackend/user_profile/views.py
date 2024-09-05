from django.shortcuts import render


# Create your views here.

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


from .models import UserProfile
from .serializers import UserProfileSerializer
from watchlist.models import Watchlist

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_default_watchlist(request):
    userprofile = get_object_or_404(UserProfile,owner=request.user)
    serializer = UserProfileSerializer(userprofile)
    return Response(serializer.data)
