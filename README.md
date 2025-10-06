# Sistema de gestion de inventario Agora
Un sistema web completo para la gestión de inventario, ventas, productos y proveedores, desarrollado con el stack MERN (MySQL, Express, React, Node.js) y estilizado con Shadcn/UI.


## Descripción
Este proyecto es una aplicación web diseñada para facilitar la administración y el control de inventarios de manera eficiente. Permite a los usuarios monitorear las operaciones clave del negocio a través de un dashboard interactivo, gestionar ventas, organizar el catálogo de productos y mantener un registro detallado de los proveedores.

## Módulos Principales

#### Dashboard
- Visualización de Estadísticas Clave: Gráficos y tarjetas que muestran métricas importantes como ventas totales del día, productos más vendidos, y niveles de stock, ganancias del día.

#### Módulo de Ventas
- Registro de Ventas: Permite crear, ver, y gestionar las transacciones de venta.

#### Gestión de Productos
- CRUD de Productos: Funcionalidades para Crear, Leer, Actualizar y Eliminar (CRUD) productos en el inventario.

- Control de Stock: Actualización automática del stock con cada venta y compra.

#### Gestion de Proveedores
- CRUD de Proveedores: Administra la información de contacto y los detalles de los proveedores.

## Tecnologías Utilizadas
Este proyecto fue construido utilizando las siguientes tecnologías:
- Backend:
  - Node.js: Entorno de ejecución para JavaScript del lado del servidor.
  - Express: Framework para la construcción de la API REST.
- Base de Datos:
  - MySQL: Sistema de gestión de bases de datos relacional.
- Frontend:
  - React: Biblioteca para la construcción de interfaces de usuario.
  - Shadcn/UI: Colección de componentes de interfaz de usuario reutilizables y accesibles.

## Instalación y Puesta en Marcha
Para poder probar el proyecto en un entorno local:
### Requisitos previos
- Tener instalado Node.js 18.x o superior
- Tener un gestor de paquetes instalado
- Tener una instancia de MySql en ejecución
### Pasos para la instalación
1. Clonar Repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
  ```
2. Configurar Backend
```bash
cd backend
npm install
```
 - Crear archivo .env
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_bd
PORT=3001
```
3. Configurar Frontend
```bash
cd ../frontend
npm install
```

### Ejecución de la Aplicación
1. Inicia el Backend
```
cd backend
npm start
```
2. Inicia la app del Frontend
```
cd ../frontend
npm start
```