from rest_framework.pagination import PageNumberPagination


class VariablePageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    page_size_query_description = 'Specify the size of the page (max. 100)'
    max_page_size = 100
