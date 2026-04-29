FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Cambiar puerto a 8080
EXPOSE 8080

# Config nginx para usar 8080
CMD ["nginx", "-g", "daemon off;"]