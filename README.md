# Customer Management Backend

This is the **backend API** for the Customer Management System.  
It is built with **Node.js**, **Express**, and **MySQL**.  
The backend provides RESTful APIs for managing customers and their addresses.

---

## 🚀 Features

- Customer CRUD operations
- Manage customer addresses
- MySQL relational database with foreign key constraints
- Secure API with structured error handling
- Deployed separately from frontend

---

## 📂 Project Structure

backend/
│── controllers/ # API business logic
│── routes/ # API routes
│── db.js # MySQL database connection
│── server.js # Express app entry point
│── .env # Environment variables (ignored by git)
│── package.json # Node.js dependencies and scripts
│── README.md # Project documentation

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the backend root:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname

4️⃣ Run the Server
npm start
