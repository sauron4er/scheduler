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
def get_visits_list(first_date):
    last_date = first_date + timedelta(days=20)
    visits = [{
        'id': visit.id,
        'client': visit.client.name,
        'employee': visit.employee.name,
        # 'start_date': convert_to_localtime(visit.start, '%d.%m.%y'),
        # 'start_time': convert_to_localtime(visit.start, '%H:%M'),
        # 'finish_date': convert_to_localtime(visit.finish, '%d.%m.%y'),
        # 'finish_time': convert_to_localtime(visit.finish, '%H:%M'),
        'start': convert_to_localtime(visit.finish, '%d.%m.%y %H:%M'),
        'finish': convert_to_localtime(visit.finish, '%d.%m.%y %H:%M'),
        'note': visit.note
    } for visit in Visit.objects
        .filter(start__range=(first_date, last_date))
        .filter(is_active=True)]
    return visits
