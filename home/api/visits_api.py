from datetime import datetime, timedelta
from scheduler.api.try_except import try_except
from home.models import Visit


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
