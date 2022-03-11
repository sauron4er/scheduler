from django.conf.urls import url
from .views import home, schedule, clients, get_clients, post_new_client

app_name = 'home'

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^schedule', schedule, name='schedule'),
    url(r'^clients', clients, name='clients'),
    url(r'^get_clients/(?P<page>\d+)/$', get_clients, name='get_clients'),
    url(r'^post_new_client', post_new_client, name='post_new_client'),

]
