FROM python:3

WORKDIR /usr/src/app
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 4000

CMD [ "python", "./src/server.py" ]