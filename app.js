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
  let env_var = process.env.ENV_VAR;
  console.log(env_var); // Log the environment variable to the console
  res.status(200).json({ message: env_var });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", status: "error" });
});

module.exports = app;
