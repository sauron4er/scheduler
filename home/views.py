from django.utils.timezone import make_aware
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from datetime import datetime, date, timedelta
from django.shortcuts import render
from django.utils import timezone
import json
from home.models import Holiday
from home.api.clients_api import get_clients_page, get_clients_for_select, add_client, get_client_info
from home.api.employees_api import get_employees_page, get_employees_for_select, add_employee
from home.api.visits_api import add_visit, change_visit, get_visits_list, get_client_visits, deactivate_visit
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


@try_except
@login_required(login_url='login')
def get_client_for_scheduler(request, pk):
    client_info = get_client_info(pk)
    future = get_client_visits(pk, timezone.now(), 'future')
    past = get_client_visits(pk, timezone.now(), 'past')
    return HttpResponse(json.dumps({'info': client_info, 'future': future, 'past': past}))


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
def del_visit(request, pk):
    return HttpResponse(deactivate_visit(pk))


@try_except
@login_required(login_url='login')
def get_week(request):
    day_one = make_aware(datetime.strptime(request.POST['first_day'], "%d.%m.%y"))

    week_dates = get_week_dates(day_one)
    visits = get_visits_list(day_one)
    return HttpResponse(json.dumps({'visits': visits, 'week_dates': week_dates}))


@try_except
def get_week_dates(first_day):
    today = date.today()

    raw_dates = [
        first_day,
        first_day + timedelta(days=1),
        first_day + timedelta(days=2),
        first_day + timedelta(days=3),
        first_day + timedelta(days=4),
        first_day + timedelta(days=5),
        first_day + timedelta(days=6)
    ]

    dates = []

    for raw_date in raw_dates:
        dates.append({
            'date': raw_date.strftime("%d.%m.%y"),
            'is_holiday': Holiday.objects.filter(date=raw_date).filter(is_active=True).exists(),
            'is_today': raw_date.date() == today
        })

    return dates
