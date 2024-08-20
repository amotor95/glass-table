from rest_framework import serializers
from .models import Watchlist

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Watchlist
        fields = ['id', 'name', 'owner']
