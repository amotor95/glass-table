from django.db import models
from django.contrib.auth.models import User
from watchlist.models import Watchlist

# Create your models here.

class UserProfile(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    default_watchlist = models.OneToOneField(Watchlist, blank=True, on_delete=models.PROTECT)
