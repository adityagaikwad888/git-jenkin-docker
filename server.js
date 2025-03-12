import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hey its mike from docker image!");
});

app.get("/about", (req, res) => {
  res.send("I am a software engineer");
});

app.listen(5500, () => {
  console.log("Server is up on 5500");
});
