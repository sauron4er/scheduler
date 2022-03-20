from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.shortcuts import render
from django.db import transaction
from datetime import datetime
from decimal import Decimal
import json
from templates.components.try_except import try_except
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
def get_clients(request, page):
    clients = Client.objects.filter(is_active=True).order_by('name')

    # clients = filter_query_set(clients, json.loads(request.POST['filtering']))
    # clients = sort_query_set(clients, request.POST['sort_name'], request.POST['sort_direction'])

    paginator = Paginator(clients, 21)
    try:
        clients_page = paginator.page(int(page) + 1)
    except PageNotAnInteger:
        clients_page = paginator.page(1)
    except EmptyPage:
        clients_page = paginator.page(1)

    clients = [{
        'id': client.id,
        'name': client.name,
        'phone': client.phone,
        'address': client.address,
        'note': client.note
    } for client in clients_page.object_list]

    columns = [
        {'name': 'name', 'title': 'Ім’я'},
        {'name': 'phone', 'title': 'Телефон'},
        {'name': 'address', 'title': 'Адреса'}
    ]

    return HttpResponse(json.dumps({'rows': clients, 'columns': columns, 'pagesCount': paginator.num_pages}))


@try_except
def post_client(request):
    try:
        client = Client.objects.get(pk=request.POST['id'])
    except Client.DoesNotExist:
        client = Client()

    client.name = request.POST['name']
    client.phone = request.POST['phone']
    client.address = request.POST['address']
    client.note = request.POST['note']
    client.save()
    return HttpResponse(status=200)
