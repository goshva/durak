FROM python:3.11
RUN python3 -m venv /opt/venv
RUN pip install --upgrade pip

# This is wrong!
RUN . /opt/venv/bin/activate
COPY ./ /srv/www/durak

WORKDIR /srv/www/durak

COPY requirements.txt .

RUN pip install --no-cache-dir --root-user-action=ignore -r requirements.txt

COPY . .

CMD [ "python", "./ws.py" ]

