//set and load .env
const dotenv = require("dotenv");
dotenv.config();

//server
const express = require("express");
const app = express();
app.use(express.json()); //accept json data

app.get("/", (req, res) => {
  res.status(200);
  res.send("API IS RUNNING");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("Server Started on Port: ", PORT));
