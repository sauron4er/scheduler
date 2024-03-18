from django.urls import path, re_path
from .views import schedule, \
    clients, get_clients, get_clients_select, post_client, get_client, get_client_for_scheduler, \
    employees, get_employees, get_employees_select, post_employee, get_profile, get_themes, \
    post_visit, get_week, del_visit, toggle_holiday, profile, change_clinic

app_name = 'home'

urlpatterns = [
    re_path(r'change_clinic/(?P<clinic>\d+)/', change_clinic, name='change_clinic'),
    path('schedule', schedule, name='schedule'),
    path('get_week', get_week, name='get_week'),

    path('post_visit', post_visit, name='post_visit'),
    re_path(r'del_visit/(?P<pk>\d+)', del_visit, name='del_visit'),
    path('toggle_holiday', toggle_holiday, name='toggle_holiday'),

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
    re_path(r'get_profile', get_profile, name='get_profile'),

    path('profile', profile, name='profile'),
    path('get_themes', get_themes, name='get_themes'),

    path('', schedule, name='schedule'),
]
