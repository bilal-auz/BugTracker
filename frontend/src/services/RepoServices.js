import axios from "axios";

export async function fetchRepos() {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/repos/getRepos",
    config
  );

  return data;
}
