from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
import json
from scheduler.api.try_except import try_except
from home.models import Client, Employee, Theme


@try_except
def get_employees_page(request, page):
    employees = Employee.objects\
        .filter(is_active=True)\
        .filter(is_in_employee_list=True)\
        .order_by('name')

    employees = filter_employees_page(employees, json.loads(request.POST['filter']))
    # employees = sort_query_set(employees, request.POST['sort_name'], request.POST['sort_direction'])

    look_for_name = request.POST['look_for_name']

    rows, pages_count, page, looked_index = paginate(employees, page, look_for_name)

    columns = [
        {'label': 'name', 'title': 'Ім’я'},
        {'label': 'phone', 'title': 'Телефон'},
        {'label': 'address', 'title': 'Адреса'},
        {'label': 'note', 'title': 'Нотатка'},
        {'label': 'color', 'title': 'Колір'}
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
        'note': employee.note or '',
        'color': employee.color or '',
        'theme': employee.theme.id,
        'theme_name': employee.theme.name,
        'login': employee.user.username
    } for employee in employees_page.object_list]

    looked_index = -1

    for index, employee in enumerate(employees):
        if employee['name'] == look_for_name:
            looked_index = index

    return employees, paginator.num_pages, page, looked_index


@try_except
def get_employees_for_select(request):
    employees_list = Employee.objects \
                       .filter(is_active=True) \
                       .filter(name__icontains=request.POST['filter']) \
                       .filter(is_in_employee_list=True) \
                       .order_by('name')[:50]

    employees_list = [{
        'id': employee.id,
        'name': employee.name,
        'color': employee.color
    } for employee in employees_list]

    return employees_list


@try_except
def get_themes_for_select(request):
    themes_list = Theme.objects\
        .filter(is_active=True)\
        .order_by('name')

    themes_list = [{
        'id': theme.id,
        'name': theme.name
    } for theme in themes_list]

    return themes_list


@try_except
def post_employee_api(request):
    try:
        emp = Employee.objects.get(pk=request.POST['id'])
        employee_id = change_employee(emp, request.POST)
    except Employee.DoesNotExist:
        employee_id = add_employee(request.POST)
    return employee_id


@try_except
def get_employee_info(pk):
    employee_instance = Employee.objects.get(pk=pk)
    # employee_instance = get_object_or_404(Employee, user_id=pk)
    employee = {
        'id': employee_instance.pk,
        'name': employee_instance.name,
        'phone': employee_instance.phone or '',
        'address': employee_instance.address or '',
        'note': employee_instance.note or '',
        'color': employee_instance.color or '',
        'theme': employee_instance.theme.id,
        'theme_name': employee_instance.theme.name,
        'second_clinic_theme': employee_instance.second_clinic_theme.id,
        'second_clinic_theme_name': employee_instance.second_clinic_theme.name,
        'login': employee_instance.user.username
    }
    return employee


@try_except
def add_employee(fields):
    user = User()
    employee = Employee()

    user.username = fields['login']
    user.set_password(fields['password'])
    user.save()

    employee.user_id = user.pk
    employee.name = fields['name']
    employee.phone = fields['phone'] if fields['phone'] != '' else None
    employee.address = fields['address'] if fields['address'] != '' else None
    employee.note = fields['note'] if fields['note'] != '' else None
    employee.color = fields['color'] if fields['color'] != '' else None
    if 'theme' in fields:
        employee.theme_id = fields['theme'] if fields['theme'] != '' else 1
    if 'second_clinic_theme' in fields:
        employee.second_clinic_theme_id = fields['second_clinic_theme'] if fields['second_clinic_theme'] != '' else 3
    employee.save()

    return employee.id


@try_except
def change_employee(employee, fields):
    employee.name = fields['name']
    employee.phone = fields['phone'] if fields['phone'] != '' else None
    employee.address = fields['address'] if fields['address'] != '' else None
    employee.note = fields['note'] if fields['note'] != '' else None
    employee.color = fields['color'] if fields['color'] != '' else None
    employee.theme_id = fields['theme']
    employee.second_clinic_theme_id = fields['second_clinic_theme']

    if 'deactivate' in fields:
        employee.is_active = False
    employee.save()

    user = get_object_or_404(User, id=employee.user_id)
    user.username = fields['login']
    if fields['password']:
        user.set_password(fields['password'])
    user.save()

    return employee.id
