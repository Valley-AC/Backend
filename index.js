require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const trainingRoutes = require("./routes/training");
const fileRoutes = require("./routes/file");
var bodyParser = require('body-parser')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use('/uploads',express.static('uploads'))

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/file", fileRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
