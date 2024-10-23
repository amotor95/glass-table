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
def get_leaderboard(request):
    users = UserProfile.objects.filter(leaderboard=True)
    users = users.order_by('-account_value')
    leaderboard = []
    for person in users:
        account_name = person.user.username
        account_value = person.account_value
        leaderboard.append({'account_name' : account_name, 'account_value' : account_value})
    print(leaderboard)
    return Response(leaderboard)

@api_view(['POST'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def toggle_join_leaderboard(request):
    userprofile = get_object_or_404(UserProfile,user=request.user)
    userprofile.leaderboard = not userprofile.leaderboard
    userprofile.save()
    print(userprofile.leaderboard)
    return Response(userprofile.leaderboard)

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_join_leaderboard(request):
    userprofile = get_object_or_404(UserProfile, user=request.user)
    print(userprofile.leaderboard)
    return Response(userprofile.leaderboard)
