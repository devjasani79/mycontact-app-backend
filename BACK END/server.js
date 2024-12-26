const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors=require('cors')
connectDb();
const app = express();

const port = process.env.PORT || 5000;


// Middleware to parse JSON
app.use(express.json());
app.use(cors())
// Correctly mount the contact routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// middleware for error handlers 
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
