from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=100)
    note = models.CharField(max_length=1000, null=True)
    phone = models.CharField(max_length=10, null=True)
    address = models.CharField(max_length=100, null=True)
    added = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    note = models.CharField(max_length=1000, null=True)
    phone = models.CharField(max_length=10, null=True)
    date_in = models.DateField(auto_now=True)
    date_out = models.DateField(null=True, auto_now=True)
    color = models.CharField(max_length=6)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Visit(models.Model):
    client = models.ForeignKey(Client, related_name='visits', on_delete=models.RESTRICT)
    doctor = models.ForeignKey(Doctor, related_name='visits', on_delete=models.RESTRICT)
    start = models.DateTimeField()
    finish = models.DateTimeField()
    price = models.CharField(max_length=10)
    note = models.CharField(max_length=500, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.client
