from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db.models import Q
import json
from scheduler.api.try_except import try_except
from home.models import Client, Employee



@try_except
def add_visit(request):
    return 0
    # try:
    #     employee = Employee.objects.get(pk=request.POST['id'])
    # except Employee.DoesNotExist:
    #     employee = Employee()
    #
    # employee.name = request.POST['name']
    # employee.phone = request.POST['phone'] if request.POST['phone'] != '' else None
    # employee.address = request.POST['address'] if request.POST['address'] != '' else None
    # employee.note = request.POST['note'] if request.POST['note'] != '' else None
    # employee.color = request.POST['color'] if request.POST['color'] != '' else None
    #
    # if 'deactivate' in request.POST:
    #     employee.is_active = False
    # employee.save()
    #
    # return employee
