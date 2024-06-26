# Generated by Django 4.2.11 on 2024-04-17 08:25

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BanVe', '0010_alter_taixe_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='khachhang',
            name='avatar',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='nhanvien',
            name='avatar',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='taixe',
            name='avatar',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
    ]
