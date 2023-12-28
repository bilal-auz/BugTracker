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
    const { title, description, label, priority, status, projectId } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const newTicket = await Ticket.create({
      title,
      description: description,
      label,
      status,
      priority,
      projectId,
      createdByUser: decoded.userId,
    });

    if (newTicket) {
      await Project.findByIdAndUpdate(projectId, {
        $push: { tickets: newTicket._id },
        // $inc: { [newTicket.label === "bug" ? "bugs" : "features"]: 1 }, //increment bugs or features when adding a ticket
      });

      res.status(201).json({ newTicket });
    } else {
      res.status(400).send("Error Creating Ticket");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { ticketId } = req.params;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (ticket) {
      await Project.findByIdAndUpdate(ticket.projectId, {
        $pull: { tickets: ticketId },
        // $inc: { [ticket.label === "bug" ? "bugs" : "features"]: -1 }, //decrement bugs or features when deleting a ticket
      });

      res.status(200).send("Ticket Deleted");
    } else {
      res.status(400).send("Error Deleting Ticket");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTicket = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { ticketId } = req.params;
    const { updatedTicket } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const ticket = await Ticket.findByIdAndUpdate(ticketId, {
      ...updatedTicket,
    });

    if (ticket) {
      res.status(200).send("Ticket Updated");
    } else {
      res.status(400).send("Error Deleting Ticket");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getTickets, addTickets, deleteTicket, updateTicket };
