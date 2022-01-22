FROM python:3

WORKDIR /usr/src/app

RUN apt-get update
RUN pip install --upgrade pip

COPY requirements.txt .
COPY entrypoint.sh .

RUN pip install gunicorn
RUN pip install -r requirements.txt
RUN export $(cat .env)
RUN chmod +x entrypoint.sh

COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]