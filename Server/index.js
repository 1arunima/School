require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notFound = require("./Middleware/notFound");
const errorHandler = require("./Middleware/errorHandler");

const app = express();

// CORS configuration to allow frontend access
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // To allow cookies to be sent
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use("/auth", require("./Route/AuthRoute")); // For login
app.use("/staff", require("./Route/EmployeeRoute")); // Example route for staff
app.use("/book", require("./Route/BookRoute")); // Example route for books
app.use("/student", require("./Route/StudentRoute")); // Example route for students
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 8060;

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

startApp();
