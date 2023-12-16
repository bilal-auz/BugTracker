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

export const addProject = async (newProjectName, selectedRepo) => {
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
  };

  const { data } = await axios.post(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/projects/addProject",
    body,
    config
  );

  return data;
};
