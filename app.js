const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to the Project 5 --> APIs on AWS via CI/CD For Cloud Computing",
    status: "success",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/time", (req, res) => {
  res.status(200).json({ date: new Date() });
});

app.get("/env-var", (req, res) => {
  // Return a default value if ENV_VAR is not set
  const envVar = process.env.ENV_VAR || "Environment variable not set";
  res.status(200).json({ envVar });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", status: "error" });
});

module.exports = app;
