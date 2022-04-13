from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.db.models import Q
import json
from home.api.clients_api import get_clients_page
from scheduler.api.try_except import try_except
from home.models import Client, Doctor


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
    clients_list = Client.objects\
        .filter(is_active=True)\
        .filter(name__icontains=request.POST['filter'])\
        .order_by('name')[:50]

    clients_list = [{
        'id': client.id,
        'name': client.name
    } for client in clients_list]

    return HttpResponse(json.dumps(clients_list))


@try_except
@login_required(login_url='login')
def post_client(request):
    # TODO Чому при зміні клієнта змінюється поле Added?
    try:
        client = Client.objects.get(pk=request.POST['id'])
    except Client.DoesNotExist:
        client = Client()

    client.name = request.POST['name']
    client.phone = request.POST['phone']
    client.address = request.POST['address']
    client.note = request.POST['note']
    if 'deactivate' in request.POST:
        client.is_active = False
    client.save()

    return HttpResponse(status=200)
