console.log("THIS IS THE ACTIVE SERVER FILE");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactionRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: "https://expense-tracker-theta-dun.vercel.app",
    credentials: true,
  })
);


app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Test route
app.get('/test', (req, res) => {
  res.send('Test route working');
});
app.get('/', (req, res) => {
  res.send('UPDATED SERVER WORKING');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});