"""
URL configuration for glasstablebackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from accounts import views as accounts_views
from watchlist import views as watchlist_views
from stock import views as stock_views
from user_profile import views as user_profile_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('login', accounts_views.login),
    path('signup', accounts_views.signup),
    path('logout', accounts_views.logout),

    path('get_watchlists', watchlist_views.get_watchlists),
    path('fetch_watchlist_stocks', watchlist_views.fetch_watchlist_stocks),
    path('make_watchlist', watchlist_views.make_watchlist),
    path('delete_watchlist', watchlist_views.delete_watchlist),
    path('add_stock_to_watchlist', watchlist_views.add_stock_to_watchlist),
    path('remove_stock_from_watchlist', watchlist_views.remove_stock_from_watchlist),
    path('get_home_watchlist', watchlist_views.get_home_watchlist),

    path('get_all_stocks', stock_views.get_all_stocks),
    path('get_cash', stock_views.get_cash),
    path('get_account_value', stock_views.get_account_value),
    path('buy_stock', stock_views.buy_stock),
    path('sell_stock', stock_views.sell_stock),
    path('get_stock_info', stock_views.get_stock_info),

    path('get_leaderboard', user_profile_views.get_leaderboard),
    path('toggle_join_leaderboard', user_profile_views.toggle_join_leaderboard),
    path('get_join_leaderboard', user_profile_views.get_join_leaderboard),

]
