const axios = require("axios");
const jwt = require("jsonwebtoken");

const Project = require("../models/projectModel");
const Ticket = require("../models/ticketModel");

const getProjects = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    //get projects from database
    const projects = await Project.find({
      owner_github_id: decoded.userId,
    }).populate("tickets", "label");

    res.status(200).send(projects);
  } catch (error) {
    // const { status, message } = error;

    res.status(400).send(error.message);
  }
};

const getProject = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectId } = req.params;
    console.log(req.params);
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    //get projects from database
    const project = await Project.findOne({
      _id: projectId,
    }).populate("tickets");

    let bugs = 0;
    let features = 0;
    let openTickets = 0;

    // calculate number of bugs and features
    project.tickets.forEach((ticket) => {
      if (ticket.label === "bug") {
        bugs++;
      } else if (ticket.label === "feature") {
        features++;
      }

      if (ticket.status === "open") {
        openTickets++;
      }
    });

    project.bugs = bugs;
    project.features = features;
    project.openTickets = openTickets;
    project.closedTickets = project.tickets.length - openTickets;

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addProject = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectName, repoId, repoLink } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const newProject = await Project.create({
      name: projectName,
      owner_github_id: decoded.userId,
      repoId,
      repoLink,
      tickets: [],
    });

    if (newProject) {
      res.status(201).json({ newProject });
    } else {
      res.status(400).send("Error Creating Project");
    }
  } catch (error) {
    // const { status, message } = error;

    res.status(400).send(error.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectId } = req.params;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (deletedProject) {
      res.status(201).json({ deletedProject });
    } else {
      res.status(400).send("Error Deleting Project");
    }
  } catch (error) {
    // const { status, message } = error;

    res.status(400).send(error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectId } = req.params;
    const { newTitle } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      name: newTitle,
    });

    if (updatedProject) {
      res.status(201).json({ updatedProject });
    } else {
      res.status(400).send("Error Updating Project");
    }
  } catch (error) {
    // const { status, message } = error;

    res.status(400).send(error.message);
  }
};

module.exports = {
  getProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
};
