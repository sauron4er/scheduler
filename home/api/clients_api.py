from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db.models import Q
import json
from scheduler.api.try_except import try_except
from home.models import Client


@try_except
def get_clients_page(request, page):
    clients = Client.objects.filter(is_active=True).order_by('name')

    clients = filter_clients_page(clients, json.loads(request.POST['filter']))
    # clients = sort_query_set(clients, request.POST['sort_name'], request.POST['sort_direction'])

    rows, pages_count = paginate(clients, page)

    columns = [
        {'label': 'name', 'title': 'Ім’я'},
        {'label': 'phone', 'title': 'Телефон'},
        {'label': 'address', 'title': 'Адреса'}
    ]

    return {'rows': rows, 'columns': columns, 'pagesCount': pages_count}


@try_except
def filter_clients_page(clients, filter_query):
    name_filter = clients.filter(name__icontains=filter_query)
    phone_filter = clients.filter(phone__icontains=filter_query)
    address_filter = clients.filter(address__icontains=filter_query)
    note_filter = clients.filter(note__icontains=filter_query)

    clients = name_filter | phone_filter | address_filter | note_filter
    return clients


@try_except
def paginate(clients, page):
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

    return clients, paginator.num_pages
