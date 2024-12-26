const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://mycontactappdev.netlify.app', // Allow your Netlify domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],    // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));

// Correctly mount the contact routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Middleware for error handlers
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
