# Agora Inventory Management System
A complete web system for managing inventory, sales, products, and suppliers, developed with the MERN stack (MySQL, Express, React, Node.js) and styled with Shadcn/UI.



## Description
This project is a web application designed to simplify and streamline inventory management. It allows users to monitor key business operations through an interactive dashboard, manage sales, organize the product catalog, and maintain detailed supplier records.

## Main Modules

#### Dashboard
- Key Metrics Visualization: Displays essential business insights such as total daily sales, top-selling products, stock levels, and daily earnings using charts and summary cards.

#### Sales Module
- Sales Management: Enables users to create, view, and manage sales transactions efficiently.

#### Product Management
- Product CRUD: Includes full Create, Read, Update, and Delete (CRUD) functionality for managing products in the inventory.

- Stock Control: Automatically updates stock levels with each sale or purchase.

#### Supplier Management
- Supplier CRUD: Manages supplier information, including contact details and business data..

## Technologies Used
This project was built using the following technologies:
- Backend:
  - Node.js: JavaScript runtime environment for server-side development.
  - Express: Framework for building RESTful APIs.
- Database:
  - MySQL
- Frontend:
  - ReactJS
  - Shadcn/UI

## Installation and Setup
To run the project locally:
### Prerequisites
- Node.js version 18.x or higher
- A package manager (npm or yarn)
- A running MySQL instance
### Installation Steps
1. Clone the Repository
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
  ```
2. Set Up the Backend
```bash
cd backend
npm install
```
 - Create a .env file with the following content:
```
PORT = your_port
HOST_DB = localhost
USER_DB = root
PASSWORD = your_password
DATABASE = your_database_name
PORT_DB = 3306



```
3. Set Up Frontend
```bash
cd ../frontend
npm install
```

### Ejecución de la Aplicación
1. Start backend
```
cd backend
npm start
```
2. Start Frontend
```
cd ../frontend
npm start
```
