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
