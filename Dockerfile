# ==========================================
# Etapa 1: Compilación (Build)
# ==========================================
FROM node:20-alpine AS builder

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

# Compilar la aplicación (genera la carpeta dist/)
RUN npm run build

# ==========================================
# Etapa 2: Servidor de producción (Nginx)
# ==========================================
FROM nginx:1.25-alpine

# Copiar los archivos compilados desde la etapa anterior al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar una configuración personalizada de Nginx para manejar rutas de React (SPA)
# (Opcional, pero recomendado. Abajo te dejo el contenido de este archivo)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]