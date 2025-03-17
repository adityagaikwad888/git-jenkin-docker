const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API", status: "success" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.get("/time", (req, res) => {
  res.status(200).json({ date: new Date() });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", status: "error" });
});

module.exports = app;
