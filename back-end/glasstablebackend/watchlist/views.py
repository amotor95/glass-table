from django.shortcuts import render


# Create your views here.

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import *
from stock.models import Stock
from .serializers import WatchlistSerializer
from stock.serializers import StockSerializer

#Yahoo Finance library
import yfinance as yf

@api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_watchlists(request):
    watchlists = Watchlist.objects.filter(owner=request.user).exclude(name="XJANSJDNAJSNDJANSDJAN")
    watchlists.order_by("name")
    serializer = WatchlistSerializer(watchlists, many = True)
    return Response(serializer.data)

@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def make_watchlist(request):
    if(request.data["name"] == "XJANSJDNAJSNDJANSDJAN"):
        return Response("Watchlist name is reserved!", status=status.HTTP_400_BAD_REQUEST)
    elif(request.data["name"] == ""):
        return Response("Watchlist name cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    watchlist, created = Watchlist.objects.get_or_create(name=request.data["name"], owner=request.user)
    serializer = WatchlistSerializer(watchlist)
    if created:
        return Response({"message": "Watchlist created", "data": serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Watchlist already exists", "data": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_watchlist(request):
    if request.data["name"] == "XJANSJDNAJSNDJANSDJAN":
        return Response("Cannot delete protected watchlist!", status=status.HTTP_400_BAD_REQUEST)
    elif request.data["name"] == "Default":
        return Response("Cannot delete your default watchlist!", status=status.HTTP_400_BAD_REQUEST)
    try:
        watchlist = Watchlist.objects.get(name=request.data["name"], owner=request.user)
        watchlist.delete()
        return Response({"message": "Watchlist deleted"}, status=status.HTTP_200_OK)
    except Watchlist.DoesNotExist:
        return Response({"error": "Watchlist does not exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_stock_to_watchlist(request):
    stock = request.data["stock_name"]
    watchlist = get_object_or_404(Watchlist, name=request.data["watchlist_name"], owner=request.user)
    stocks_list = watchlist.get_tickers_list()
    try:
        ticker = yf.Ticker(stock)
        if 'currentPrice' not in ticker.info:
            return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)

    if stock not in stocks_list:
        if stocks_list[0] == '':
            stocks_list[0] = stock
        else:
            stocks_list.append(stock)

        watchlist.set_tickers_list(stocks_list)
        return Response("Added " + stock + " stock to " + watchlist.name + " watchlist!")
    else:
        return Response({"error: " : "Stock already in watchlist!"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_stock_from_watchlist(request):
    stock = request.data["stock_name"]
    watchlist = get_object_or_404(Watchlist, name=request.data["watchlist_name"], owner=request.user)
    stocks_list = watchlist.get_tickers_list()
    try:
        stocks_list.remove(stock)
        watchlist.set_tickers_list(stocks_list)
    except ValueError:
        return Response({"error": "Stock not in watchlist!"}, status=status.HTTP_400_BAD_REQUEST)
    return Response("Removed " + stock + " stock to " + watchlist.name + " watchlist!")

@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_watchlist_stocks(request):
    watchlist = get_object_or_404(Watchlist,name=request.GET["name"],owner=request.user)
    stocks = watchlist.get_tickers_list()
    ticker_data = {}
    if stocks[0] == '':
        return Response({})
    for stock in stocks:
        try:
            ticker = yf.Ticker(stock)
            ticker_data[stock] = {
                "ticker" : stock,
                "current_price": ticker.info.get('currentPrice', 'N/A'),
                "company_name": ticker.info.get('longName', 'N/A'),
            }
        except Exception as e:
            return Response({"error": f"Failed to fetch data for {stock}: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(ticker_data)

@api_view(['GET'])
def get_home_watchlist(request):
    watchlist = get_object_or_404(Watchlist,name="XJANSJDNAJSNDJANSDJAN")
    stocks = watchlist.get_tickers_list()
    ticker_data = {}
    for stock in stocks:
        try:
            ticker = yf.Ticker(stock)
            ticker_data[stock] = {
                "ticker" : stock,
                "current_price": ticker.info.get('currentPrice', 'N/A'),
                "company_name": ticker.info.get('longName', 'N/A'),
            }
        except Exception as e:
            return Response({"error": f"Failed to fetch data for {stock}: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(ticker_data)

