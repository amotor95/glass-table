from django.conf.urls import path 
from stockwatchlist import views 
 
urlpatterns = [ 
    path('api/<int:stock_id>', views.stock_info, name="stock_info")
]