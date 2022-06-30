from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime
import json
from home.api.clients_api import get_clients_page, get_clients_for_select, add_client, get_client_info
from home.api.employees_api import get_employees_page, get_employees_for_select, add_employee
from home.api.visits_api import add_visit, change_visit, get_visits_list, get_visits_list_old
from scheduler.api.try_except import try_except


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
    return HttpResponse(client.pk)


@try_except
@login_required(login_url='login')
def get_client(request, pk):
    client = get_client_info(pk)
    return HttpResponse(json.dumps(client))


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
    if request.POST['id'] == '0':
        visit_id = add_visit(request)
    else:
        visit_id = change_visit(request)
    return HttpResponse(visit_id)


@try_except
@login_required(login_url='login')
def get_visits_old(request, first_day):
    first_date = datetime.strptime(first_day, "%d.%m.%y").date()
    visits = get_visits_list_old(first_date)
    return HttpResponse(json.dumps(visits))


@try_except
@login_required(login_url='login')
def get_visits(request):
    first_day = datetime.strptime(request.POST['first_day'], "%d.%m.%y").date()
    visits = get_visits_list(first_day)
    return HttpResponse(json.dumps(visits))

