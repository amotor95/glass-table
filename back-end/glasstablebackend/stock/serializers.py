from rest_framework import serializers 
from models import Stock
 
 
class StockSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Stock
        fields = ('id',
                  'company',
                  'description',
                  'price'
                  'price',
                  'image')