# Generated by Django 4.2.9 on 2024-01-29 03:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_employee_theme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='theme',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.RESTRICT, related_name='employees', to='home.theme'),
        ),
    ]
