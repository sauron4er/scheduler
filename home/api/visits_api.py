from datetime import datetime, timedelta
from scheduler.api.try_except import try_except
from home.models import Visit
from scheduler.api.convert_to_local_time import convert_to_localtime


@try_except
def add_visit(request):
    start = datetime.strptime(request.POST['start'], '%d.%m.%y, %H:%M')
    finish = datetime.strptime(request.POST['finish'], '%d.%m.%y, %H:%M')\
        if 'finish' in request.POST else start + timedelta(hours=1)

    new_visit = Visit(client_id=request.POST['client'],
                      employee_id=request.POST['employee'],
                      note=request.POST['note'],
                      start=start,
                      finish=finish)
    new_visit.save()
    return new_visit.pk


@try_except
def get_visits_list(first_monday):

    first_sunday = first_monday + timedelta(days=6)
    second_monday = first_sunday + timedelta(days=1)
    second_sunday = second_monday + timedelta(days=6)
    third_monday = second_sunday + timedelta(days=1)
    third_sunday = third_monday + timedelta(days=6)

    three_weeks_visits = Visit.objects.filter(is_active=True)

    first_week_visits = get_weeks_visits(three_weeks_visits, first_monday, first_sunday)
    second_week_visits = get_weeks_visits(three_weeks_visits, second_monday, second_sunday)
    third_week_visits = get_weeks_visits(three_weeks_visits, third_monday, third_sunday)

    visits = {'first_week': first_week_visits,
              'second_week': second_week_visits,
              'third_week': third_week_visits}

    return visits


@try_except
def get_weeks_visits(all_visits_query, monday, sunday):
    visits = [{
        'id': visit.id,
        'client': visit.client.id,
        'client_name': visit.client.name,
        'employee': visit.employee.id,
        'employee_name': visit.employee.name,
        'date': convert_to_localtime(visit.start, '%d.%m.%y'),
        'start': convert_to_localtime(visit.start, '%H:%M'),
        'finish': convert_to_localtime(visit.finish, '%H:%M'),
        # 'start': convert_to_localtime(visit.start, '%d.%m.%y %H:%M'),
        # 'finish': convert_to_localtime(visit.finish, '%d.%m.%y %H:%M'),
        'note': visit.note
    } for visit in all_visits_query
        .filter(start__range=(monday, sunday))]
    return visits
