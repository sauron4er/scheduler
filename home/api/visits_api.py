from django.utils.timezone import make_aware
from datetime import datetime, timedelta, date
from django.shortcuts import get_object_or_404
from scheduler.api.convert_to_local_time import convert_to_localtime
from scheduler.api.try_except import try_except
from home.models import Visit


@try_except
def add_visit(request):
    start = make_aware(datetime.strptime(request.POST['start'], '%d.%m.%y, %H:%M'))
    finish = make_aware(datetime.strptime(request.POST['finish'], '%d.%m.%y, %H:%M'))\
        if 'finish' in request.POST else start + timedelta(hours=1)

    new_visit = Visit(client_id=request.POST['client'],
                      note=request.POST['note'],
                      start=start,
                      finish=finish)
    if request.POST['employee'] != '0':
        new_visit.employee_id = request.POST['employee']
    new_visit.save()
    return new_visit.pk


@try_except
def change_visit(request):
    start = make_aware(datetime.strptime(request.POST['start'], '%d.%m.%y, %H:%M'))
    finish = make_aware(datetime.strptime(request.POST['finish'], '%d.%m.%y, %H:%M')) \
        if 'finish' in request.POST else start + timedelta(hours=1)

    visit = Visit.objects.get(pk=request.POST['id'])
    visit.client_id = request.POST['client']
    if request.POST['employee'] != '0':
        visit.employee_id = request.POST['employee']
    visit.note = request.POST['note']
    visit.start = start
    visit.finish = finish
    visit.save()
    return visit.pk


@try_except
def get_visits_list(first_day):
    seventh_day = first_day + timedelta(days=7)
    visits = [{
        'id': visit.id,
        'client': visit.client.id,
        'client_name': visit.client.name,
        'client_phone': visit.client.phone or '',
        'employee': visit.employee.id if visit.employee else 0,
        'employee_name': visit.employee.name if visit.employee else '',
        'employee_color': visit.employee.color if visit.employee else '',
        'date': convert_to_localtime(visit.start, '%d.%m.%y'),
        'start': convert_to_localtime(visit.start, '%H:%M'),
        'finish': convert_to_localtime(visit.finish, '%H:%M'),
        # 'start': convert_to_localtime(visit.start, '%d.%m.%y %H:%M'),
        # 'finish': convert_to_localtime(visit.finish, '%d.%m.%y %H:%M'),
        'note': visit.note
    } for visit in Visit.objects \
        .filter(start__range=(first_day, seventh_day)) \
        .filter(client__is_active=True) \
        .filter(is_active=True)]
    return visits


@try_except
def get_client_visits(client_id, now, direction=''):
    visits = Visit.objects \
        .filter(client_id=client_id) \
        .filter(is_active=True)

    if direction == 'future':
        # Віднімаємо 1 годину щоб візити "live" показувало в таблиці "майбутні"
        now_plus_one_hour = now - timedelta(hours=1)
        visits = visits.filter(start__gte=now_plus_one_hour)
    elif direction == 'past':
        visits = visits.filter(start__lt=now)

    visits = [{
        'id': visit.id,
        'employee': visit.employee.id if visit.employee else 0,
        'employee_name': visit.employee.name if visit.employee else '',
        'employee_color': visit.employee.color if visit.employee else '',
        'date': convert_to_localtime(visit.start, '%d.%m.%y'),
        'start': convert_to_localtime(visit.start, '%H:%M'),
        'finish': convert_to_localtime(visit.finish, '%H:%M'),
        'note': visit.note
    } for visit in visits]
    return visits


@try_except
def deactivate_visit(pk):
    visit = get_object_or_404(Visit, pk=pk)
    visit.is_active = False
    visit.save()
    return 'ok'
