from django.db import models
from django.contrib.auth.models import User
from watchlist.models import Watchlist

# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cash = models.DecimalField(max_digits=10, decimal_places=2, default=50000)
    account_value = models.DecimalField(max_digits=10, decimal_places=2, default=50000)
    leaderboard = models.BooleanField(default=True)