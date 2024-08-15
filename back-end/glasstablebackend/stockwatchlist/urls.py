from django.urls import path 
from django.contrib import admin
from stockwatchlist.views import StockView 
 
urlpatterns = [ 
    path('admin/', admin.site.urls),
    path('', StockView.as_view(), name="stockview")
]