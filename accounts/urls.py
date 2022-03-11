from django.conf.urls import url
from .views import accounts, unauthorised, get_accounts, get_account, post_account, deact_account

app_name = 'accounts'

urlpatterns = [
    url(r'^get_accounts', get_accounts, name='get_accounts'),
    url(r'^get_account/(?P<pk>\d+)$', get_account, name='get_account'),
    url(r'^post_account/(?P<pk>\d+)$', post_account, name='post_account'),
    url(r'^deact_account/(?P<pk>\d+)$', deact_account, name='deact_account'),
    url(r'^accounts', accounts, name='accounts'),
    url(r'^unauthorised', unauthorised, name='unauthorised'),
]
