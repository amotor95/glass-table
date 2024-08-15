from django.db import models

# Create your models here.

class Watchlist(models.Model):
    company = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(default='fallback.png', blank=True)
