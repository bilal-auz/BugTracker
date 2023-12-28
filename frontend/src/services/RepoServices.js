import axios from "axios";

export async function fetchRepos() {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/repos/getRepos",
    config
  );

  return data;
}

export async function fetchPinnedRepos(username) {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };
  const body = {
    username,
  };

  const { data } = await axios.post(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/repos/getPinnedRepos",
    body,
    config
  );

  return data;
}
