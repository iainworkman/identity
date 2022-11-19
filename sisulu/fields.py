import logging

from cryptography.fernet import Fernet, InvalidToken

from django.db.models.fields import CharField
from django.forms import PasswordInput

logger = logging.getLogger(__name__)


class EncryptedCharField(CharField):
    key = ''
    cipher = None

    def __init__(self, key='', *args, **kwargs):
        self.key = key
        self.cipher = Fernet(key)
        super().__init__(*args, **kwargs)

    def from_db_value(self, value, *args):
        return self.to_python(value.encode())

    def to_python(self, value):
        if isinstance(value, bytes):
            try:
                return self.cipher.decrypt(value).decode()
            except (InvalidToken, ValueError):
                return value

        return super().to_python(value)

    def get_prep_value(self, value):
        value = super().get_prep_value(value)
        return self.cipher.encrypt(value.encode()).decode()

    def get_db_prep_value(self, value, connection, prepared=False):
        if not prepared:
            value = self.get_prep_value(value)

        return value

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()

        if self.key != '':
            kwargs['key'] = self.key

        return name, path, args, kwargs

    def formfield(self, **kwargs):
        defaults = {'widget': PasswordInput()}
        defaults.update(kwargs)
        return super().formfield(**defaults)
