# Generated by Django 4.2.11 on 2024-04-08 15:26

import cloudinary.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BanVe', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chuyenxe',
            old_name='Ma_taixe',
            new_name='Ma_TaiXe',
        ),
        migrations.RenameField(
            model_name='khachhang',
            old_name='Ma_loai',
            new_name='Loai_KH',
        ),
        migrations.RenameField(
            model_name='nhanvien',
            old_name='Ma_loai',
            new_name='Loai_NV',
        ),
        migrations.RenameField(
            model_name='ve_xe',
            old_name='Ma_Chuyen_Xe',
            new_name='Ma_ChuyenXe',
        ),
        migrations.RenameField(
            model_name='ve_xe',
            old_name='Ma_KH',
            new_name='Ma_KhachHang',
        ),
        migrations.RenameField(
            model_name='ve_xe',
            old_name='Ma_NV',
            new_name='Ma_NhanVien',
        ),
        migrations.RenameField(
            model_name='xe',
            old_name='Ma_loai',
            new_name='Loaixe',
        ),
        migrations.AddField(
            model_name='ghe',
            name='Bienso_Xe',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='BanVe.xe'),
        ),
        migrations.AddField(
            model_name='khachhang',
            name='image',
            field=cloudinary.models.CloudinaryField(default='image/upload/v1711390925/unghi7vkrcec7tx1fhbr.jpg', max_length=255),
        ),
        migrations.AddField(
            model_name='nhanvien',
            name='image',
            field=cloudinary.models.CloudinaryField(default='image/upload/v1711390925/unghi7vkrcec7tx1fhbr.jpg', max_length=255),
        ),
        migrations.AddField(
            model_name='taixe',
            name='image',
            field=cloudinary.models.CloudinaryField(default='image/upload/v1711390925/unghi7vkrcec7tx1fhbr.jpg', max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/duz2xltvs/image/upload/v1711390925/unghi7vkrcec7tx1fhbr.jpg', max_length=255),
        ),
        migrations.AlterField(
            model_name='ghe',
            name='Loai_ghe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='BanVe.loai_ghe'),
        ),
        migrations.AlterField(
            model_name='xe',
            name='Bien_so',
            field=models.CharField(default='1', max_length=255),
        ),
    ]
