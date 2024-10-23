from rest_framework import serializers
from .models import UserProfile
from watchlist.serializers import WatchlistSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = UserProfile
        fields = ['id',
                  'user',
                  'cash',
                  'account_value',
                  'leaderboard']
