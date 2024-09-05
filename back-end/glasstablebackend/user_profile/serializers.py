from rest_framework import serializers
from .models import UserProfile
from watchlist.serializers import WatchlistSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    default_watchlist = WatchlistSerializer()
    class Meta(object):
        model = UserProfile
        fields = ['owner', 'default_watchlist']
