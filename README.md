# Inventario-Interculturalidad

## Integrantes
- Christopher Bazurto
- Stephen Drouet
- Leonardo de la Cadena
- Ricardo Rivadeneira
- Andy Pilozo

## Descripción

Esta aplicación basada en microservicios permite la gestión de usuarios y de inventarios, utilizando Docker para la contenedorización de los servicios. La aplicación consta de los siguientes componentes:

1. **Microservicio de Autenticación**: Implementado con Express, utiliza JWT para la autenticación y bcrypt para el hash de contraseñas.
2. **Microservicio de Inventarios**: Implementado con Express, proporciona operaciones CRUD para la gestión de inventarios.
3. **Cliente**: Implementado con React, utiliza las APIs de los microservicios para construir la interfaz de inicio de sesión, registro de usuario y control de inventarios.

## Requisitos Previos

- Docker
- Docker Compose

## Instalación y Ejecución

1. Clona este repositorio:

    ```bash
    git clone https://github.com/SDDrouet/crud-inventario-microservicios
    cd crud-inventario-microservicios
    ```

2. Construye y levanta los servicios con Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. Accede a la aplicación cliente en tu navegador:

    ```
    http://localhost
    ```

## Servicios

### Microservicio de Autenticación

- **Descripción**: Proporciona endpoints para el registro y autenticación de usuarios.
- **Tecnologías**: Express, JWT, bcrypt
- **Endpoints**:
    - Registro (POST): `http://localhost:3120/api/auth/register`
    - Inicio de Sesión (POST): `http://localhost:3120/api/auth/login`
    - Ruta Protegida (GET): `http://localhost:3120/protected` (Requiere token en el encabezado `Authorization: Bearer <token>`)

### Microservicio de Inventarios

- **Descripción**: Proporciona operaciones CRUD para la gestión de productos en el inventario.
- **Tecnologías**: Express
- **Endpoints**:
    - Insertar Producto (POST): `http://localhost:3121/api/productos`
    - Obtener Todos los Productos por id del usuario (GET): `http://localhost:3121/api/productos/:idU`
    - Obtener Producto por ID (GET): `http://localhost:3121/api/productos/:id`
    - Actualizar Producto (PUT): `http://localhost:3121/api/productos/:id`
    - Eliminar Producto (DELETE): `http://localhost:3121/api/productos/:id`

### Cliente

- **Descripción**: Aplicación frontend que interactúa con los microservicios de autenticación e inventarios.
- **Tecnologías**: React
- **Funcionalidades**:
    - Inicio de Sesión
    - Registro de Usuario
    - Gestión de Inventarios (Agregar, Editar, Eliminar Productos)


## Documentación Colaborativa

Puedes consultar las reflexiones del equipo en el siguiente archivo:

👉 [docs/COLABORACION.md](docs/COLABORACION.md)
