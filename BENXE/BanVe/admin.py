from django.contrib import admin
from django.utils.html import mark_safe

from .models import NhanVien, KhachHang, LoaiXe, Loai_ghe, TaiXe, Xe, Ghe, TuyenXe, ChuyenXe, \
    Ve_Xe, Chi_Tiet_Ve_Xe, Comment, Like


# Admin quản lý(thêm/xoá/sửa/tìm kiếm) chuyến xe, tuyến xe, nhân viên, tài xế công ty
class NhanVienAdmin(admin.ModelAdmin):
    list_display = ['id', 'Ten_NV', 'NgaySinh', 'DienThoai', 'DiaChi', 'Email', 'Loai_NV']
    search_fields = ['id', 'Ten_NV']
    list_filter = ['id', 'Ten_NV', 'Loai_NV']
    readonly_fields = ['my_image']

    def my_image(self, NhanVien):
        if NhanVien.image:
            return mark_safe(f"<img src='https://res.cloudinary.com/duz2xltvs/{NhanVien.image}' width='200' />")


class KhachHangAdmin(admin.ModelAdmin):
    list_display = ['id', 'Ten_KH', 'NgaySinh', 'DienThoai', 'DiaChi', 'Email', 'Loai_KH']
    search_fields = ['id', 'Ten_KH']
    list_filter = ['id', 'Ten_KH', 'Loai_KH']
    readonly_fields = ['my_image']

    def my_image(self, KhachHang):
        if KhachHang.image:
            return mark_safe(f"<img src='https://res.cloudinary.com/duz2xltvs/{KhachHang.image}' width='200' />")


class TaiXeAdmin(admin.ModelAdmin):
    list_display = ['id', 'Ten_taixe', 'NgaySinh', 'DienThoai', 'DiaChi', 'Email']
    search_fields = ['id', 'Ten_taixe']
    list_filter = ['id', 'Ten_taixe']
    readonly_fields = ['my_image']

    def my_image(self, TaiXe):
        if TaiXe.image:
            return mark_safe(f"<img src='https://res.cloudinary.com/duz2xltvs/{TaiXe.image}' width='200' />")


# Nhanvien ở đây là tên bảng
admin.site.register(NhanVien, NhanVienAdmin)
admin.site.register(KhachHang, KhachHangAdmin)
admin.site.register(TaiXe, TaiXeAdmin)
admin.site.register(TuyenXe)
admin.site.register(ChuyenXe)
admin.site.register(LoaiXe)
admin.site.register(Loai_ghe)
admin.site.register(Xe)
admin.site.register(Ghe)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Ve_Xe)
admin.site.register(Chi_Tiet_Ve_Xe)
