from datetime import date

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db import models
from django.db.models import Q

user_model = get_user_model()


class Organization(models.Model):

    name = models.CharField(max_length=150, help_text='The name for this organization', unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class RelationshipType(models.Model):

    name = models.CharField(
        max_length=250, help_text='The name of this type of relationship'
    )
    organization = models.ForeignKey(
        Organization, on_delete=models.PROTECT,
        help_text='The organization to which this relationship type belongs'
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Relationship(models.Model):

    name = models.CharField(
        max_length=250, help_text='The name of the relationship',
    )
    groups = models.ManyToManyField(
        Group, related_name='relationships', blank=True,
        help_text='Groups which users with an active relationship of this instance will be added to'
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class UserRelationshipQuerySet(models.QuerySet):

    def active(self):
        return self.active_on(date.today())

    def active_on(self, active_date):
        return self.filter(
            Q(starts_on__isnull=True) | Q(starts_on__lte=active_date)
            &
            Q(ends_after__isnnull=True) | Q(ends_after__gte=active_date)
        )


class UserRelationship(models.Model):

    user = models.ForeignKey(
        user_model, on_delete=models.CASCADE, related_name='relationships',
        help_text='The user who this membership applies to'
    )
    starts_on = models.DateField(
        null=True, blank=True,
        help_text='The first day on which this relationship is considered active on'
    )
    ends_after = models.DateField(
        null=True, blank=True,
        help_text='The last day which this relationship is active for'
    )
    position = models.CharField(
        max_length=250,
        help_text='A customized name for this position'
    )

    objects = UserRelationshipQuerySet.as_manager()

    class Meta:
        ordering = ['starts_on']

    def __str__(self):
        return self.position

    @property
    def is_active(self):
        starts_on = self.starts_on or date.min
        ends_after = self.ends_after or date.max

        return starts_on <= date.today() <= ends_after
