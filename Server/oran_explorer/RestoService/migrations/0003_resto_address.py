# Generated by Django 5.1.3 on 2025-04-24 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RestoService', '0002_resto_latitude_resto_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='resto',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
    ]
