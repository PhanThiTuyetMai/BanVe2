# Generated by Django 4.2.11 on 2024-04-17 09:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('BanVe', '0011_alter_khachhang_avatar_alter_nhanvien_avatar_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('active', models.BooleanField(default=True)),
                ('content', models.CharField(max_length=255)),
                ('chuyenxe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BanVe.chuyenxe')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('active', models.BooleanField(default=True)),
                ('chuyenxe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BanVe.chuyenxe')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'chuyenxe')},
            },
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
    ]
