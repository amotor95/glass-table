from django.db import models
from django.contrib.auth.models import User
from Stock.models import Stock

# Create your models here.

class Watchlist(models.Model):
    name = models.CharField(max_length=200, blank=False, default='')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stocks = models.ManyToManyField(Stock, blank=True)

def __str__(self):
    return self.name