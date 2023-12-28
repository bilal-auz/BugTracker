const cors = require("cors");

// //set and load .env
// const dotenv = require("dotenv");
// dotenv.config();

//connect Database
const connect_db = require("./config/db");
connect_db();

//server
const express = require("express");
const app = express();
app.use(express.json()); //accept json data
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const reposRoutes = require("./routes/reposRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketsRoutes = require("./routes/ticketsRoutes");

app.get("/", (req, res) => {
  res.status(200);
  res.send("API IS RUNNING");
});

app.use("/api/auth", authRoutes);
app.use("/api/repos", reposRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tickets", ticketsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("Server Started on Port: ", PORT));
