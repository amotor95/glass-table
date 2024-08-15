from django.shortcuts import render
from rest_framework.views import APIView
from .models import Watchlist
from .serializers import StockwatchlistSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class StockView(APIView):

    @csrf_exempt
    def get(self, request):
        # output = [{
        #     "company" : output.company,
        #     "description" : output.description,
        #     "price" : output.price,
        #     "image" : output.image,}
        #     for output in Watchlist.objects.all()
        # ]
        # return Response(output)

        watchlists = Watchlist.objects.all()
        serializer = StockwatchlistSerializer(watchlists, many=True)
        return Response(serializer.data)
    
    @csrf_exempt
    def post(self, request):
        serializer = StockwatchlistSerializer(data=request.data)
        if serializer.is_valid(raise_expception=True):
            serializer.save()
            return Response(serializer.data)


