# Generated by Django 4.2.11 on 2024-04-16 09:00

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BanVe', '0007_rename_image_nhanvien_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='khachhang',
            name='image',
            field=cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/duz2xltvs/image/upload/v1711390925/unghi7vkrcec7tx1fhbr.jpg', max_length=255),
        ),
    ]