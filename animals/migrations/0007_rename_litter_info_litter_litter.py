# Generated by Django 5.1.2 on 2024-11-03 01:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0006_litter_dog_litter'),
    ]

    operations = [
        migrations.RenameField(
            model_name='litter',
            old_name='litter_info',
            new_name='litter',
        ),
    ]