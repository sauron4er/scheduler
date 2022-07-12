from django.urls import path, re_path
from .views import home, schedule, \
    clients, get_clients, get_clients_select, post_client, get_client, get_client_for_scheduler, \
    employees, get_employees, get_employees_select, post_employee, \
    post_visit, get_week, del_visit

app_name = 'home'

urlpatterns = [
    path('', home, name='home'),
    path('schedule', schedule, name='schedule'),
    re_path(r'get_client_for_scheduler/(?P<pk>\d+)/', get_client_for_scheduler, name='get_client_for_scheduler'),

    path('clients', clients, name='clients'),
    path('get_clients_select', get_clients_select, name='get_clients_select'),
    re_path(r'get_clients/(?P<page>\d+)/', get_clients, name='get_clients'),
    path('post_client', post_client, name='post_client'),
    re_path(r'get_client/(?P<pk>\d+)/', get_client, name='get_client'),

    path('employees', employees, name='employees'),
    path('get_employees_select', get_employees_select, name='get_employees_select'),
    re_path(r'get_employees/(?P<page>\d+)/', get_employees, name='get_employees'),
    path('post_employee', post_employee, name='post_employee'),

    path('get_week', get_week, name='get_week'),
    path('post_visit', post_visit, name='post_visit'),
    re_path(r'del_visit/(?P<pk>\d+)', del_visit, name='del_visit'),
]
