# Generated by Django 4.0.6 on 2024-03-21 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_alter_employee_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='visit',
            name='clinic',
            field=models.CharField(default='1', max_length=1),
        ),
    ]
