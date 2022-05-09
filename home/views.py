from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.db.models import Q
import json
from home.api.clients_api import get_clients_page, get_clients_for_select, add_client
from home.api.employees_api import get_employees_page, get_employees_for_select, add_employee
from home.api.visits_api import add_visit
from scheduler.api.try_except import try_except
from home.models import Client, Employee


@login_required(login_url='login')
def home(request):
    if request.method == 'GET':
        return render(request, 'home/schedule/index.html')


@login_required(login_url='login')
def schedule(request):
    if request.method == 'GET':
        return render(request, 'home/schedule/index.html')


@login_required(login_url='login')
def clients(request):
    if request.method == 'GET':
        return render(request, 'home/clients/index.html')


@try_except
@login_required(login_url='login')
def get_clients(request, page):
    return HttpResponse(json.dumps(get_clients_page(request, page)))


@try_except
@login_required(login_url='login')
def get_clients_select(request):
    clients_list = get_clients_for_select(request)
    return HttpResponse(json.dumps(clients_list))


@try_except
@login_required(login_url='login')
def post_client(request):
    client = add_client(request)
    # TODO Чому при зміні клієнта змінюється поле Added?
    return HttpResponse(client.pk)


@login_required(login_url='login')
def employees(request):
    if request.method == 'GET':
        return render(request, 'home/employees/index.html')


@try_except
@login_required(login_url='login')
def get_employees(request, page):
    return HttpResponse(json.dumps(get_employees_page(request, page)))


@try_except
@login_required(login_url='login')
def get_employees_select(request):
    employees_list = get_employees_for_select(request)
    return HttpResponse(json.dumps(employees_list))


@try_except
@login_required(login_url='login')
def post_employee(request):
    employee = add_employee(request)
    return HttpResponse(employee.pk)


@try_except
@login_required(login_url='login')
def post_visit(request):
    new_visit_id = add_visit(request)
    return HttpResponse(new_visit_id)
