const axios = require("axios");

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

  //access_token
  //scope
  //token_type=bearer

  //JWT the access token and pass it to the frontend

  res.status(200).send(data);
};

module.exports = { authCallback };
