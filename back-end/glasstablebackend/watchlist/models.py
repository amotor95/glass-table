from django.db import models
from django.contrib.auth.models import User
from stock.models import Stock

# Create your models here.

class Watchlist(models.Model):
    name = models.CharField(max_length=200, blank=False, default='')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #Stock tickers stored as a comma seperated list
    stocks = models.TextField(blank=True, default='')

    def get_tickers_list(self):
        return self.stocks.split(',')

    def set_tickers_list(self, tickers_list):
        self.stocks = ','.join(tickers_list)
        self.save()
    

def __str__(self):
    return self.name