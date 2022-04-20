from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db.models import Q
import json
from scheduler.api.try_except import try_except
from home.models import Client


@try_except
def get_employees_page(request, page):
    employees = Client.objects.filter(is_active=True).order_by('name')

    employees = filter_employees_page(employees, json.loads(request.POST['filter']))
    # employees = sort_query_set(employees, request.POST['sort_name'], request.POST['sort_direction'])

    look_for_name = request.POST['look_for_name']

    rows, pages_count, page, looked_index = paginate(employees, page, look_for_name)

    columns = [
        {'label': 'name', 'title': 'Ім’я'},
        {'label': 'phone', 'title': 'Телефон'},
        {'label': 'address', 'title': 'Адреса'},
        {'label': 'note', 'title': 'Нотатка'}
    ]

    return {'rows': rows, 'columns': columns, 'pagesCount': pages_count, 'page': page, 'clicked_row': looked_index}


@try_except
def filter_employees_page(employees, filter_query):
    name_filter = employees.filter(name__icontains=filter_query)
    phone_filter = employees.filter(phone__icontains=filter_query)
    address_filter = employees.filter(address__icontains=filter_query)
    note_filter = employees.filter(note__icontains=filter_query)

    employees = name_filter | phone_filter | address_filter | note_filter
    return employees


@try_except
def paginate(employees, page, look_for_name):
    items_per_page = 21
    paginator = Paginator(employees, items_per_page)

    if look_for_name != '':
        position = employees.filter(name__lt=look_for_name).order_by('name').count()
        page = int(position / items_per_page)

    try:
        employees_page = paginator.page(int(page) + 1)
    except PageNotAnInteger:
        employees_page = paginator.page(1)
    except EmptyPage:
        employees_page = paginator.page(1)

    employees = [{
        'id': employee.id,
        'name': employee.name,
        'phone': employee.phone or '',
        'address': employee.address or '',
        'note': employee.note or ''
    } for employee in employees_page.object_list]

    looked_index = -1

    for index, employee in enumerate(employees):
        if employee['name'] == look_for_name:
            looked_index = index

    return employees, paginator.num_pages, page, looked_index


@try_except
def get_employees_for_select(request):
    employees_list = Client.objects \
                       .filter(is_active=True) \
                       .filter(name__icontains=request.POST['filter']) \
                       .order_by('name')[:50]

    employees_list = [{
        'id': employee.id,
        'name': employee.name
    } for employee in employees_list]

    return employees_list


@try_except
def post_employee(request):
    try:
        employee = Client.objects.get(pk=request.POST['id'])
    except Client.DoesNotExist:
        employee = Client()

    employee.name = request.POST['name']
    employee.phone = request.POST['phone'] if request.POST['phone'] != '' else None
    employee.address = request.POST['address'] if request.POST['address'] != '' else None
    employee.note = request.POST['note'] if request.POST['note'] != '' else None

    if 'deactivate' in request.POST:
        employee.is_active = False
    employee.save()

    return employee
