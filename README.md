# TNE Backend

API REST desarrollada con NestJS para el sistema de autenticación TNE.
Maneja registro de usuarios, login con JWT y control de roles.

## Tecnologías
- NestJS
- TypeORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- Docker

## Requisitos previos
- Node.js v20 o superior
- npm
- Docker Desktop (para la base de datos)
- Repositorio `tne-database` corriendo

## Instalación

1. Clona este repositorio:
git clone https://github.com/1rv1nn/tne-backend.git
cd tne-backend

1. Instala las dependencias:
npm install

1. Copia el archivo de variables de entorno:
copy .env.example .env

1. Asegúrate de que el servicio de base de datos esté corriendo:
cd ../tne-database
docker compose up -d

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Ambiente de ejecución | development |
| DB_HOST | Host de la base de datos | localhost |
| DB_PORT | Puerto de la base de datos | 5432 |
| DB_USER | Usuario de la base de datos | tne_user |
| DB_PASSWORD | Contraseña de la base de datos | tne_password |
| DB_NAME | Nombre de la base de datos | tne_db |
| JWT_SECRET | Clave secreta para JWT | supersecretkey123 |
| JWT_EXPIRES_IN | Expiración del token | 1d |

## Correr en desarrollo

npm run start:dev

El servidor estará disponible en: http://localhost:3000

## Endpoints

### Registro
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "12345678",
  "password_confirmation": "12345678"
}

### Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@tne.com",
  "password": "password"
}

### Perfil autenticado
GET /api/auth/me
Authorization: Bearer TOKEN

## Usuario administrador de prueba

| Campo | Valor |
|-------|-------|
| Email | admin@tne.com |
| Password | password |
| Rol | admin |

## Correr con Docker

docker compose up -d