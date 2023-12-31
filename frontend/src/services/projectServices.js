import axios from "axios";

export const fetchProjects = async () => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/projects/getProjects",
    config
  );

  //calculate number of bugs and features
  let bugs = 0;
  let features = 0;
  data.forEach((project) => {
    project.tickets.forEach((ticket) => {
      if (ticket.label === "bug") {
        bugs++;
      } else if (ticket.label === "feature") {
        features++;
      }
    });

    project.bugs = bugs;
    project.features = features;
    bugs = 0;
    features = 0;
  });

  return data;
};

export const addProject = async (newProjectName, selectedRepo, repoLink) => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const body = {
    projectName: newProjectName,
    repoId: selectedRepo,
    repoLink,
  };

  const { data } = await axios.post(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/projects/addProject",
    body,
    config
  );

  return data;
};

export const fetchProject = async (projectId) => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_ENDPOINT +
      "/projects/getProject/" +
      projectId,
    config
  );

  return data;
};

export const deleteProject = async (projectId) => {
  try {
    const access_token = localStorage.getItem("access_token");

    const config = {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${access_token}`,
      },
    };

    const { data } = await axios.delete(
      process.env.REACT_APP_BACKEND_ENDPOINT +
        "/projects/deleteProject/" +
        projectId,
      config
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updatedProject = async (projectId, newTitle) => {
  try {
    const access_token = localStorage.getItem("access_token");

    const config = {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${access_token}`,
      },
    };
    const body = {
      newTitle: newTitle,
    };
    const { data } = await axios.patch(
      process.env.REACT_APP_BACKEND_ENDPOINT + "/projects/" + projectId,
      body,
      config
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
