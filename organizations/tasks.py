from celery import shared_task
from django.contrib.auth import get_user_model

user_model =  get_user_model()

@shared_task
def update_group_memberships():
    for user in user_model.objects.all():
        active_user_relationships = user.user_relationships.active().prefetch_related('relationship')
        active_groups = []
        for active_user_relationship in active_user_relationships:
            active_groups += [group for group in active_user_relationship.relationship.groups.all()]

        user.groups.set(active_groups)

