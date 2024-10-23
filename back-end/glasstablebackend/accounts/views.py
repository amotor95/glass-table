from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
# from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password

from watchlist.models import Watchlist
from user_profile.models import UserProfile

from .serializers import UserSerializer

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    print("Signup started!")
    if serializer.is_valid():
        # try:
        #     validate_email(request.data["email"])
        # except ValidationError:
        #     print("Bad email")
        #     return Response({'error': 'Invalid email address'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(request.data["password"])
        except ValidationError as e:
            print("Bad password")
            return Response({'error': list(e.messages)}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=request.data['username']).exists():
            print("Username exists")
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        default_watchlist = Watchlist.objects.create(name="Default", owner=user)
        default_watchlist.stocks = "AAPL,MSFT,GOOGL,AMZN,TSLA"
        default_watchlist.save()
        user_profile = UserProfile.objects.create(user=user)
        user_profile.cash = 50000
        user_profile.account_value = 50000
        user_profile.save()
        print("User profile made")
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.user.is_authenticated:
        try:
            request.user.auth_token.delete()
            return Response("Logged out!", status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"detail": "Token not found."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"detail": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

