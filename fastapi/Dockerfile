FROM python:latest
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./app /code/app
CMD ["fastapi", "run", "app/main.py", "--port", "6969", "--root-path", "/fastapi"]