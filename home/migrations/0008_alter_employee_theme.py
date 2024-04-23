# Generated by Django 4.0.6 on 2024-03-21 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_alter_employee_theme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='theme',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.RESTRICT, related_name='employees_first_clinic', to='home.theme'),
        ),
    ]