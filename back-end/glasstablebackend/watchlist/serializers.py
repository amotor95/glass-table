from rest_framework import serializers
from .models import Watchlist
from stock.serializers import StockSerializer

class WatchlistSerializer(serializers.ModelSerializer):
    # stocks = StockSerializer()
    class Meta(object):
        model = Watchlist
        fields = ['id', 'name', 'owner', 'stocks']
