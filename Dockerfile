FROM docker.clsi.ca/library/rockylinux:9-minimal as environment

COPY requirements.txt /tmp/requirements.txt
RUN microdnf install -y python python-pip \
    && pip3 install --upgrade pip \
    && pip3 install -r /tmp/requirements.txt

