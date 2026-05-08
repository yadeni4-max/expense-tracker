# 💰 Expense Tracker (MERN Stack)

A full-stack Expense Tracker web application built with the MERN stack that helps users manage income, expenses, categories, and visualize financial data with charts.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login)
- 🔑 JWT-based protected routes
- ➕ Add income and expense transactions
- 🏷️ Category-based expense tracking (Food, Rent, Transport, etc.)
- ✏️ Edit and ❌ Delete transactions
- 📊 Pie chart (Expense breakdown by category)
- 📈 Income vs Expense summary
- 📅 Monthly filtering system
- 📱 Responsive UI (Mobile friendly)

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Chart.js + React Chart.js 2
- CSS (Custom Styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)

---

## 📁 Project Structure


expense-tracker/
│
├── client/ (Frontend)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│
├── server/ (Backend)
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yadeni4-max/expense-tracker.git

2. Install backend dependencies
cd server
npm install

3. Install frontend dependencies
cd client
npm install

4. Setup environment variables

Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5. Run backend server (LIVE https://expense-tracker-opgm.onrender.com)
cd server
npm run dev

6. Run frontend (LIVE https://expense-tracker-theta-dun.vercel.app)
cd client
npm run dev

📊 Features Preview
🔐 Authentication
Secure login and registration system

💰 Dashboard
View total income, expense, and balance

📊 Charts
Expense breakdown by category (Pie chart)
Visual financial insights

🏷️ Transactions
Add, edit, delete transactions
Categorized expenses

🧠 Key Concepts Used
REST API design
CRUD operations
JWT authentication
State management in React
Data visualization with Chart.js
Component-based architecture

📱 Responsive Design
The application is fully responsive and works on:

📱 Mobile devices
💻 Tablets
🖥️ Desktop screens

👨‍💻 Author
Built by Yadeni Lemessa

📜 License
This project is for educational purposes.