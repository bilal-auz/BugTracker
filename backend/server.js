const cors = require("cors");

//set and load .env
const dotenv = require("dotenv");
dotenv.config();

//connect Database
const connect_db = require("./config/db");
connect_db();

//server
const express = require("express");
const app = express();
app.use(express.json()); //accept json data
app.use(cors());

const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
  res.status(200);
  res.send("API IS RUNNING");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("Server Started on Port: ", PORT));
