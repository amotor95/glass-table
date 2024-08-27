from django.shortcuts import render


# Create your views here.

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Watchlist
from stock.models import Stock
from .serializers import WatchlistSerializer

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_watchlists(request):
    watchlists = Watchlist.objects.filter(owner=request.user)
    watchlists.order_by("name")
    serializer = WatchlistSerializer(watchlists, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_watchlist_stocks(request):
    watchlist = get_object_or_404(Watchlist,name=request.data["name"],owner=request.user)
    stocks = watchlist.stocks.all()
    serializer = WatchlistSerializer(stocks, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def make_watchlist(request):
    watchlist, created = Watchlist.objects.get_or_create(name=request.data["name"], owner=request.user)
    serializer = WatchlistSerializer(watchlist)
    if(created):
        return Response("Watchlist created: " + serializer.data)
    else:
        return Response("Watchlist already exists: " + serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_watchlist(request):
    watchlist = get_object_or_404(Watchlist, name=request.data["name"], owner=request.user)
    watchlist.delete()
    return Response(request.data["name"] + " deleted!")

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_stock_to_watchlist(request):
    stock = get_object_or_404(Stock, name=request.data["stock_name"])
    watchlist = get_object_or_404(Watchlist, name=request.data["watchlist_name"], user=request.user)
    watchlist.stocks.add(stock)
    return Response("Added " + stock.company + " stock to " + watchlist.name + " watchlist!")

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_stock_from_watchlist(request):
    stock = get_object_or_404(Stock, name=request.data["stock_name"])
    watchlist = get_object_or_404(Watchlist, name=request.data["watchlist_name"], user=request.user)
    watchlist.stocks.remove(stock)
    return Response("Removed " + stock.company + " stock to " + watchlist.name + " watchlist!")

