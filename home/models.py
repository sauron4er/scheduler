from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
    name = models.CharField(max_length=100)
    note = models.CharField(max_length=1000, null=True)
    phone = models.CharField(max_length=10, null=True)
    address = models.CharField(max_length=100, null=True)
    added = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.RESTRICT)
    name = models.CharField(max_length=100)
    note = models.CharField(max_length=1000, null=True)
    phone = models.CharField(max_length=10, null=True)
    address = models.CharField(max_length=100, null=True)
    date_in = models.DateField(auto_now_add=True)
    date_out = models.DateField(null=True)
    color = models.CharField(max_length=7)
    theme = models.CharField(max_length=1, default=1)  # 1 - white, 2 - yellow
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Visit(models.Model):
    client = models.ForeignKey(Client, related_name='visits', on_delete=models.RESTRICT)
    employee = models.ForeignKey(Employee, related_name='visits', on_delete=models.RESTRICT, null=True)
    start = models.DateTimeField()
    finish = models.DateTimeField()
    price = models.CharField(max_length=10, null=True)
    note = models.CharField(max_length=500, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.client.name + ', ' + self.start.__str__()


class Holiday(models.Model):
    date = models.DateField()
    is_active = models.BooleanField(default=True)
