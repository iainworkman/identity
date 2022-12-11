#!/bin/bash

ldapadd -x -D "cn=${LDAP_ADMIN_USERNAME},dc=example,dc=org" -w ${LDAP_ADMIN_PASSWORD} -H ldap://127.0.0.1:1389 -f /ldifs/test-domain.ldif