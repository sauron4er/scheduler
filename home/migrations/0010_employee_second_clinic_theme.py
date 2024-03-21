# Generated by Django 4.0.6 on 2024-03-21 05:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_visit_clinic'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='second_clinic_theme',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.RESTRICT, related_name='employees_second_clinic', to='home.theme'),
        ),
    ]
