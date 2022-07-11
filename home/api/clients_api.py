from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404
import json
from scheduler.api.try_except import try_except
from home.models import Client


@try_except
def get_clients_page(request, page):
    clients = Client.objects.filter(is_active=True).order_by('name')

    clients = filter_clients_page(clients, json.loads(request.POST['filter']))
    # clients = sort_query_set(clients, request.POST['sort_name'], request.POST['sort_direction'])

    look_for_name = request.POST['look_for_name']

    rows, pages_count, page, looked_index = paginate(clients, page, look_for_name)

    columns = [
        {'label': 'name', 'title': 'Ім’я'},
        {'label': 'phone', 'title': 'Телефон'},
        {'label': 'address', 'title': 'Адреса'},
        {'label': 'note', 'title': 'Нотатка'}
    ]

    return {'rows': rows, 'columns': columns, 'pagesCount': pages_count, 'page': page, 'clicked_row': looked_index}


@try_except
def filter_clients_page(clients, filter_query):
    name_filter = clients.filter(name__icontains=filter_query)
    phone_filter = clients.filter(phone__icontains=filter_query)
    address_filter = clients.filter(address__icontains=filter_query)
    note_filter = clients.filter(note__icontains=filter_query)

    clients = name_filter | phone_filter | address_filter | note_filter
    return clients


@try_except
def paginate(clients, page, look_for_name):
    items_per_page = 21
    paginator = Paginator(clients, items_per_page)

    if look_for_name != '':
        position = clients.filter(name__lt=look_for_name).order_by('name').count()
        page = int(position / items_per_page)

    try:
        clients_page = paginator.page(int(page) + 1)
    except PageNotAnInteger:
        clients_page = paginator.page(1)
    except EmptyPage:
        clients_page = paginator.page(1)

    clients = [{
        'id': client.id,
        'name': client.name,
        'phone': client.phone or '',
        'address': client.address or '',
        'note': client.note or ''
    } for client in clients_page.object_list]

    looked_index = -1

    for index, client in enumerate(clients):
        if client['name'] == look_for_name:
            looked_index = index

    return clients, paginator.num_pages, page, looked_index


@try_except
def get_clients_for_select(request):
    clients_list = Client.objects \
                       .filter(is_active=True) \
                       .filter(name__icontains=request.POST['filter']) \
                       .order_by('name')[:50]

    clients_list = [{
        'id': client.id,
        'only_name': client.name,
        'phone': client.phone,
        'name': (client.name + ', ' + client.phone) if client.phone else client.name,
        'note': client.note,
    } for client in clients_list]

    return clients_list


@try_except
def add_client(request):
    try:
        client = Client.objects.get(pk=request.POST['id'])
    except Client.DoesNotExist:
        client = Client()

    client.name = request.POST['name']
    client.phone = request.POST['phone'] if request.POST['phone'] != '' else None
    client.address = request.POST['address'] if request.POST['address'] != '' else None
    client.note = request.POST['note'] if request.POST['note'] != '' else None

    if 'deactivate' in request.POST:
        client.is_active = False
    client.save()

    return client


@try_except
def get_client_info(pk):
    client = get_object_or_404(Client, pk=pk)
    client = {
        'id': client.id,
        'name': client.name,
        'address': client.address or '',
        'phone': client.phone or '',
        'note': client.note or ''
    }
    return client
