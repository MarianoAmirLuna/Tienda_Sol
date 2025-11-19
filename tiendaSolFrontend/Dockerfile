# --- FASE 1: Construcción (builder) ---
# Usamos Node.js para compilar React/Vite
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia e instala dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el código fuente y compila la aplicación
COPY . .
RUN npm run build 

# --- FASE 2: Servir con NGINX (Producción) ---
# Usamos una imagen ligera de NGINX, optimizada para servir estáticos.
FROM nginx:alpine

# Copia el archivo de configuración de NGINX para manejar las rutas de React (SPA)
# Este archivo (nginx.conf) debe existir en tu carpeta /frontend/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos compilados (de la carpeta 'dist')
COPY --from=builder /app/dist /usr/share/nginx/html

# EXPONER PUERTO: NGINX por defecto escucha en el puerto 80.
# Debes configurar el puerto de tu servicio Frontend en Railway a 80.
EXPOSE 80

# Comando de inicio de NGINX
CMD ["nginx", "-g", "daemon off;"]