from django.db import models
from django.contrib.auth.models import User
from nomenclature.models import ClientType


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.RESTRICT)
    legal_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, null=True)
    client_type = models.ForeignKey(ClientType, related_name='clients', on_delete=models.RESTRICT, null=True)
    edrpou = models.CharField(max_length=8, blank=True, null=True)
    certificate_number = models.CharField(max_length=20)

    class Meta:
        verbose_name = 'Профіль'
        verbose_name_plural = 'Профілі'
