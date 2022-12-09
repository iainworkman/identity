from django.contrib import admin

from organizations.models import Organization, Relationship, UserRelationship, RelationshipType

admin.site.register(Organization)
admin.site.register(RelationshipType)
admin.site.register(Relationship)
admin.site.register(UserRelationship)
