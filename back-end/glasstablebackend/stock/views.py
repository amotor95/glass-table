from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required

from .models import Stock
from .serializers import StockSerializer
# Create your views here.

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_stock(request):
    stock = get_object_or_404(Stock, company=request.data["company"])
    serializer = StockSerializer(stock)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@staff_member_required
def make_stock(request):
    stock, created = Stock.objects.get_or_create(company=request.data["company"], defaults={'description':request.data["description"], 'price':request.data["price"], 'image':request.data["image"],})
    serializer = StockSerializer(stock)
    if(created):
        return Response("Stock created: " + serializer.data)
    else:
        return Response("Stock already exists: " + serializer.data)
    
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@staff_member_required
def delete_stock(request):
    stock = get_object_or_404(Stock, company=request.data["company"])
    serializer = StockSerializer(stock)
    return Response(stock.company + " deleted!")
    
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@staff_member_required
def update_stock(request):
    stock = get_object_or_404(Stock, company=request.data["company"])
    stock.update(company=request.data['company'], description=request.data["description"], price=request.data["price"], image=request.data["image"])
    serializer = StockSerializer(stock)
    return Response("Watchlist updated: " + serializer.data)

