from django.conf.urls import url
from .views import home, schedule, clients, get_clients, get_clients_select, post_client

app_name = 'home'

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^schedule', schedule, name='schedule'),
    url(r'^clients', clients, name='clients'),
    url(r'^get_clients_select', get_clients_select, name='get_clients_select'),
    url(r'^get_clients/(?P<page>\d+)/$', get_clients, name='get_clients'),
    url(r'^post_client', post_client, name='post_client'),

]
