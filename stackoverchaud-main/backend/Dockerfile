FROM node:18-slim
WORKDIR /app
COPY package*.json tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]