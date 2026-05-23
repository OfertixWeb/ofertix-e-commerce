# ==========================================
# Etapa 1: Compilación (Build)
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente del proyecto
COPY . .

# Declarar los argumentos de construcción (Build Args)
# Es crucial declararlos aquí para que Vite los reconozca durante el build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

# Pasar los argumentos a variables de entorno de la sesión de compilación
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

RUN npm run build

# 2. Etapa de producción (servidor web)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]