from django.contrib import admin
from django.urls import include, path, re_path
from django.contrib.auth.views import LoginView, LogoutView
from django.views.static import serve
from scheduler import settings

from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),

    path('admin/', admin.site.urls, name='sam_admin'),
    path('logout/', LogoutView.as_view(), {'template_name': 'accounts/login.html'}, name='logout'),
    path('login/', LoginView.as_view(), {'template_name': 'accounts/login.html'}, name='login'),

    path('home/', include('home.urls', namespace='home')),
    path('', include('home.urls', namespace='home_from_blank')),
]
