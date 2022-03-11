from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from templates.components.try_except import try_except
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
import string
import random
import json
from .models import UserProfile
from templates.components.convert_to_local_time import convert_to_localtime


@staff_member_required(login_url='accounts:unauthorised')
def accounts(request):
    if request.method == 'GET':
        return render(request, 'accounts/accounts_list/index.html')


@staff_member_required(login_url='accounts:unauthorised')
@try_except
def get_accounts(request):
    accounts_list = UserProfile.objects\
        .filter(user__is_superuser=False)\
        .filter(user__is_staff=False)
    accounts_list = [{
        'id': account.id,
        'legal_name': account.legal_name,
        'representative': (account.user.last_name or '') + ' ' + (account.user.first_name or ''),
        'phone': account.phone or '',
        'mail': account.user.email or '',
        'edrpou': account.legal_name or '',
        'is_active': account.user.is_active
    } for account in accounts_list]
    return HttpResponse(json.dumps(accounts_list))


@staff_member_required(login_url='accounts:unauthorised')
@try_except
def get_account(request, pk):
    account = UserProfile.objects.filter(id=pk)[0]

    account = {
        'id': account.id,
        'client_type': account.client_type_id,
        'client_type_name': account.client_type.name,
        'legal_name': account.legal_name,
        'last_name': account.user.last_name or '',
        'first_name': account.user.first_name or '',
        'phone': account.phone or '',
        'email': account.user.email or '',
        'edrpou': account.edrpou or '',
        'certificate_number': account.certificate_number or '',
        'username': account.user.username,
        'last_login': convert_to_localtime(account.user.last_login, 'datetime') if account.user.last_login else '',
        'is_staff': account.user.is_staff,
    }
    return HttpResponse(json.dumps(account))


@login_required(login_url='login')
@try_except
def post_account(request, pk):
    if pk == '0':
        new_user = User.objects.create_user(request.POST['username'], request.POST['mail'], request.POST['new_password'])
        new_user.save()
        new_account = UserProfile(user=new_user)
    else:
        new_account = get_object_or_404(UserProfile, id=pk)
        new_user = get_object_or_404(User, userprofile=new_account)

        new_user.username = request.POST['username']
        new_user.email = request.POST['mail']
        if request.POST['new_password'] != '':
            new_user.set_password(request.POST['new_password'])

    new_user.first_name = request.POST['first_name']
    new_user.last_name = request.POST['last_name']
    new_user.is_staff = True if request.POST['client_type'] == 4 else False
    new_user.save()

    new_account.client_type_id = request.POST['client_type']
    new_account.legal_name = request.POST['legal_name']
    new_account.phone = request.POST['phone']
    new_account.edrpou = request.POST['edrpou']
    new_account.certificate_number = request.POST['certificate_number']
    new_account.save()

    # create_and_send_mail('admin_new', new_operation)
    # create_and_send_mail('counterparty_new', new_operation)

    return HttpResponse(status=200)


@login_required(login_url='login')
@try_except
def deact_account(request, pk):
    user = get_object_or_404(User, userprofile__id=pk)
    user.is_active = False
    user.set_password(str(''.join(random.choices(string.ascii_uppercase + string.digits, k=10))))
    user.save()
    return HttpResponse(status=200)


@login_required(login_url='login')
@try_except
def get_users(request):
    user_profiles = UserProfile.objects.filter(user__is_active=True).exclude(client_type_id=4)
    user_profiles = [{
        'id': user_profile.id,
        'name': user_profile.legal_name
    } for user_profile in user_profiles]

    user_profiles.insert(0, {'id': 0, 'name': '---'})
    return HttpResponse(json.dumps(user_profiles))


@login_required(login_url='login')
def unauthorised(request):
    if request.method == 'GET':
        return render(request, 'accounts/unauthorised.html')
