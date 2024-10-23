# Generated by Django 5.1 on 2024-10-13 17:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='stock',
            old_name='company',
            new_name='ticker',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='description',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='image',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='price',
        ),
        migrations.AddField(
            model_name='stock',
            name='buy_price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
        migrations.AddField(
            model_name='stock',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='stock',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
