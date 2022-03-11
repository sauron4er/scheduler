from django.contrib import admin
from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, LogoutView
from django.views.static import serve
from scheduler import settings

from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),

    url(r'^admin/', admin.site.urls, name='sam_admin'),
    url(r'^logout/$', LogoutView.as_view(), {'template_name': 'accounts/login.html'}, name='logout'),
    url(r'^login/$', LoginView.as_view(), {'template_name': 'accounts/login.html'}, name='login'),

    url(r'^home/', include('home.urls', namespace='home')),
    url(r'^', include('home.urls', namespace='home_from_blank')),
]
