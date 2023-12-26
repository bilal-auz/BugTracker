const axios = require("axios");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/ticketModel");
const Project = require("../models/projectModel");

const getTickets = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectId } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    //get projects from database
    const projects = await Ticket.find({ projectId: projectId });

    res.status(200).send(projects);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addTickets = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { title, desc, label, priority, status, projectId } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const newTicket = await Ticket.create({
      title,
      description: desc,
      label,
      status,
      priority,
      projectId,
      createdByUser: decoded.userId,
    });

    if (newTicket) {
      await Project.findByIdAndUpdate(projectId, {
        $push: { tickets: newTicket._id },
        $inc: { [newTicket.label === "bug" ? "bugs" : "features"]: 1 }, //increment bugs or features when adding a ticket
      });

      res.status(201).json({ newTicket });
    } else {
      res.status(400).send("Error Creating Ticket");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getTickets, addTickets };
