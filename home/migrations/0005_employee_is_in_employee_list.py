# Generated by Django 4.0.6 on 2022-08-02 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_theme_employee_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='is_in_employee_list',
            field=models.BooleanField(default=True),
        ),
    ]
