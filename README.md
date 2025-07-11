# Projet E5 DevSecOps Docker – ESTIAM Paris

### **Groupe :**

- Salman Ali Madec
- Faraan Rozbully
- Mateo Oudart
- Ianis Chennaf
- Lucas Cannizzaro

---

## Objectif du Projet

Ce projet a pour but de :

- Déployer **4 applications** (dont une statique et une utilisant Stripe) dans un environnement Docker
- Mettre en place une infrastructure légère, accessible via un **reverse proxy**
- Documenter la démarche DevSecOps et publier le code en **open source**

---

## Architecture du Projet

```
                       [ Internet ]
	                           |
                    +-----------------+
                    | Reverse Proxy   |
                    | (ex: Nginx)     |
                    +--------+--------+
                             |
    +------------+-----------+-----------+-----------+
    |            |                       |           |
[ App 1 ]    [ App 2 ]              [ App 3 ]    [ App 4 ]
```

---

## Stack Technique

- **Docker & Docker Compose**
- **Reverse Proxy :** Nginx
- **Applications :**
    - Burger-restau
    - Fastapi
    - List product cards
    - mysql
- **Hébergement d’images :**

---

## Installation & Lancement

1. Cloner le repo :
    
    ```bash
    git clone <https://github.com/Salman-Ali05/docker_E5.git>
    cd docker_E5
    
    ```
    
2. Lancer la stack :

```bash
docker-compose up
```

1. Accéder aux applications :

Le service nginx est configuré pour être hôte des applications compilés front-end et sert égalemement de reverse-proxy pour accéder au applications backend.  

Les routes disponibles sont :

- [http://localhost/fastapi](http://localhost/fastapi)
- [http://localhost/fastapi/docs](http://localhost/fastapi/docs)
- [http://localhost/products](http://localhost/products)
- [http://localhost/burger](http://localhost/burger)

Pour les applications de frontend, on sépare les étapes de build du run. On peut prendre par exemple le build de notre application burger :

```docker
FROM node:18-alpine AS burger-builder
WORKDIR /burger
COPY ./burger-restau/package*.json ./
RUN npm install
COPY ./burger-restau .
RUN npm run build
```

ici on va utiliser une image alpine qui est plus légère que l’image node standard. On se sert de cette image pour compiler le projet qui est un projet ViteJs.

On répète cette étape avec les autres applications frontend qui ont besoin d’être compilés avant de passer à l’étape de run.

```docker
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=burger-builder /burger/dist ./burger
COPY --from=products-builder /products/dist ./products
CMD ["nginx", "-g", "daemon off;"]
```

Dans l’étape de run, on va venir copier le résultat des builds dans le working directory de nginx (/usr/share/nginx/html). Une fois cette étape complétée, on va lancer le serveur nginx.

On utlise encore une fois une image alpine pour réduire la taille de l’image.

Pour configurer notre serveur, on va utiliser un ficher de config nginx dans lequel on spécifie notre redirexion proxy du backend et la racine de nos pages html.

```
upstream fastapi {
    server fastapi:6969;
}
server {
    listen 80;    server_name localhost;
    location /fastapi/ {
        proxy_pass http://fastapi/;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location / {
        root /usr/share/nginx/html/;
    }
}
```

[http://localhost](http://localhost/) → reverse proxy