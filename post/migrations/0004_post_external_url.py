# Generated by Django 4.0 on 2021-12-19 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_post_name_alter_post_caption'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='external_url',
            field=models.URLField(default='https://www.google.com/'),
            preserve_default=False,
        ),
    ]
