const axios = require("axios");
const generateToken = require("../config/generateToken");
const { getUser } = require("./userController");

const authCallback = async (req, res) => {
  const { code, client_id, client_secret } = req.body;

  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const body = {
    code,
    client_id,
    client_secret,
  };

  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    body,
    config
  );

  const config_user = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${data.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  const userData = await axios.get("https://api.github.com/user", config_user);

  const token = generateToken(data.access_token, userData.data.id);

  res.status(200).send(token);
};

module.exports = { authCallback };
