from django.conf.urls import url
from .views import home, schedule, \
    clients, get_clients, get_clients_select, post_client, \
    employees, get_employees, get_employees_select, post_employee, \
    post_visit, get_visits

app_name = 'home'

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^schedule', schedule, name='schedule'),

    url(r'^clients', clients, name='clients'),
    url(r'^get_clients_select', get_clients_select, name='get_clients_select'),
    url(r'^get_clients/(?P<page>\d+)/$', get_clients, name='get_clients'),
    url(r'^post_client', post_client, name='post_client'),

    url(r'^employees', employees, name='employees'),
    url(r'^get_employees_select', get_employees_select, name='get_employees_select'),
    url(r'^get_employees/(?P<page>\d+)/$', get_employees, name='get_employees'),
    url(r'^post_employee', post_employee, name='post_employee'),

    url(r'^get_visits/(?P<first_day>\d{2}.\d{2}.\d{2})/$', get_visits, name='get_visits'),
    # url(r'^get_visits/(?P<first_day>\w+)/$', get_visits, name='get_visits'),
    url(r'^post_visit', post_visit, name='post_visit'),
]
