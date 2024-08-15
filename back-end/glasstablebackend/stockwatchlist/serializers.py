from rest_framework import serializers 
from stockwatchlist.models import Watchlist
 
 
class StockwatchlistSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Watchlist
        fields = ('id',
                  'company',
                  'description',
                  'price',
                  'image')