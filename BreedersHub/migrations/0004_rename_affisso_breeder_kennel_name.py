# Generated by Django 5.1.2 on 2024-11-01 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BreedersHub', '0003_breeder_affisso'),
    ]

    operations = [
        migrations.RenameField(
            model_name='breeder',
            old_name='affisso',
            new_name='kennel_name',
        ),
    ]
