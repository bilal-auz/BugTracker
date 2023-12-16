const axios = require("axios");
const jwt = require("jsonwebtoken");

const Project = require("../models/projectModel");
const Ticket = require("../models/ticketModel");

const getProjects = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    //get projects from database
    const projects = await Project.find({ owner_github_id: decoded.userId });

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
    });

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addProject = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const { projectName, repoId } = req.body;

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const newProject = await Project.create({
      name: projectName,
      owner_github_id: decoded.userId,
      repoId,
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

module.exports = { getProjects, getProject, addProject };
