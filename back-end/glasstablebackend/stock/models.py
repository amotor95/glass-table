from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Stock(models.Model):
    ticker = models.CharField(max_length=70, blank=False, default='')
    quantity = models.IntegerField(default = 0)
    buy_price = models.DecimalField(max_digits=10, decimal_places=2, default = 1)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)

def __str__(self):
    return self.ticker