const axios = require("axios");

//https://api.github.com/orgs/ORG/repos
const getRepos = async (req, res) => {
  try {
    const access_token = req.headers.Authorization;

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `${access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };

    const { data } = await axios.get(
      "https://api.github.com/user/repos",
      config
    );

    res.status(200).send(data);
  } catch (error) {
    const { status, data } = error.response;

    res.status(status).send(data.message);
  }
};

module.exports = { getRepos };
