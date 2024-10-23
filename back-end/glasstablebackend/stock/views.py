from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from decimal import Decimal

from .models import Stock
from .serializers import StockSerializer

from user_profile.models import UserProfile


# Create your views here.

#Yahoo Finance library
import yfinance as yf

@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def buy_stock(request):
    print("REQUEST: ", request.data)
    print("REQUEST Quantity: ", request.data["quantity"])
    if request.data["ticker"] == "":
        return Response("Ticker cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif request.data["quantity"] == "":
        return Response("Quantity cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif int(request.data["quantity"]) <= 0:
        return Response("Quantity must be greater than zero!", status=status.HTTP_400_BAD_REQUEST)
    elif int(request.data["price"])*int(request.data["quantity"]) > UserProfile.objects.get(user=request.user).cash:
        return Response("Insufficient funds!", status=status.HTTP_400_BAD_REQUEST)
    elif request.data["price"] == "":
        return Response("Price cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif int(request.data["price"]) <= 0:
        return Response("Price must be greater than zero!", status=status.HTTP_400_BAD_REQUEST)
    
    stock = request.data["ticker"]
    try:
        stock = yf.Ticker(stock)
        if 'currentPrice' not in stock.info:
            return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)

    if Stock.objects.filter(ticker=request.data["ticker"], owner=request.user).exists():
        stock = Stock.objects.get(ticker=request.data["ticker"], owner=request.user)
        total_quantity = Decimal(stock.quantity + Decimal(request.data["quantity"]))
        stock.buy_price = Decimal(stock.buy_price) * Decimal(Decimal(stock.quantity)/total_quantity) + Decimal(request.data["price"]) * Decimal(Decimal((request.data["quantity"]))/total_quantity)
        stock.quantity += int(request.data["quantity"])
        stock.save()

    else:
        stock = Stock.objects.create(
            ticker=request.data["ticker"],
            quantity=int(request.data["quantity"]),
            buy_price=int(request.data["price"]),
            owner=request.user
        )
    userprofile = UserProfile.objects.get(user=request.user)
    userprofile.cash -= int(request.data["price"])*int(request.data["quantity"])
    userprofile.save()
    serializer = StockSerializer(stock)
    return Response(serializer.data)

@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def sell_stock(request):
    print("REQUEST: ", request.data)
    print("REQUEST Quantity: ", request.data["quantity"])
    if request.data["ticker"] == "":
        return Response("Ticker cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif request.data["quantity"] == "":
        return Response("Quantity cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif int(request.data["quantity"]) <= 0:
        return Response("Quantity must be greater than zero!", status=status.HTTP_400_BAD_REQUEST)
    elif request.data["price"] == "":
        return Response("Price cannot be empty!", status=status.HTTP_400_BAD_REQUEST)
    elif int(request.data["price"]) <= 0:
        return Response("Price must be greater than zero!", status=status.HTTP_400_BAD_REQUEST)
    
    stock = request.data["ticker"]
    try:
        stock = yf.Ticker(stock)
        if 'currentPrice' not in stock.info:
            return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": "Invalid stock ticker!"}, status=status.HTTP_400_BAD_REQUEST)

    if Stock.objects.filter(ticker=request.data["ticker"], owner=request.user).exists():
        stock = Stock.objects.get(ticker=request.data["ticker"], owner=request.user)
        if stock.quantity < int(request.data["quantity"]):
            return Response("Insufficient stock quantity!", status=status.HTTP_400_BAD_REQUEST)
        elif stock.quantity == int(request.data["quantity"]):
            stock.delete()
        else:
            stock.quantity -= int(request.data["quantity"])
            stock.save()
    else:
        return Response("User does not own that stock!", status=status.HTTP_400_BAD_REQUEST)
    userprofile = UserProfile.objects.get(user=request.user)
    userprofile.cash += int(request.data["price"])*int(request.data["quantity"])
    userprofile.save()
    serializer = StockSerializer(stock)
    return Response(serializer.data)

@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_stocks(request):
    stocks = Stock.objects.filter(owner=request.user)
    serializer = StockSerializer(stocks, many=True)
    for stock in serializer.data:
        stock["current_price"] = yf.Ticker(stock["ticker"]).info.get('currentPrice', 'N/A')
        stock["company_name"] = yf.Ticker(stock["ticker"]).info.get('longName', 'N/A')
    print("Get all stocks serializer: ", serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cash(request):
    if not UserProfile.objects.filter(user=request.user).exists():
        user_profile = UserProfile.objects.create(user=request.user)
        user_profile.cash = 50000
        user_profile.account_value = user_profile.cash
        user_profile.save()
    cash = UserProfile.objects.get(user=request.user).cash
    print("CASH: ",cash)
    print("USER-PROFILE: ",UserProfile.objects.get(user=request.user))
    return Response({"cash": cash})

@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_account_value(request):
    if not UserProfile.objects.filter(user=request.user).exists():
        user_profile = UserProfile.objects.create(user=request.user)
        user_profile.cash = 50000
        user_profile.account_value = user_profile.cash
        user_profile.save()
    stocks = Stock.objects.filter(owner=request.user)
    account_value = UserProfile.objects.get(user=request.user).cash
    for stock in stocks:
        account_value += Decimal(yf.Ticker(stock.ticker).info.get('currentPrice'))*stock.quantity
    user_profile = UserProfile.objects.get(user=request.user)
    user_profile.account_value = account_value
    user_profile.save()
    print("ACCOUNT_VALUE: ", account_value)
    print("USER-PROFILE: ",UserProfile.objects.get(user=request.user))
    return Response({"account_value": account_value})

@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_stock_info(request):
    print(request)
    ticker = request.query_params.get('ticker')
    stock_data = {}
    try:
        stock = yf.Ticker(ticker)
        stock_data[ticker] = {
            "ticker" : ticker,
            "current_price": stock.info.get('currentPrice', 'N/A'),
            "company_name": stock.info.get('longName', 'N/A'),
        }
        print("TICKER: ", ticker)
        print("STOCK DATA: ", stock_data[ticker])
        return Response(stock_data[ticker])
    except Exception as e:
        return Response({"error": e + "Error receiving stock info !"}, status=status.HTTP_400_BAD_REQUEST)
