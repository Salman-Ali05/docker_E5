FROM node:18-alpine AS burger-builder
WORKDIR /burger
COPY ./burger-restau/package*.json ./
RUN npm install
COPY ./burger-restau .
RUN npm run build

FROM node:18-alpine AS products-builder
WORKDIR /products
COPY ./list-product-card/package*.json ./
RUN npm install
COPY ./list-product-card .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=burger-builder /burger/dist ./burger
COPY --from=products-builder /products/dist ./products
CMD ["nginx", "-g", "daemon off;"]