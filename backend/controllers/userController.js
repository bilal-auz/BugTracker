const axios = require("axios");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${decoded.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };

    const { data } = await axios.get("https://api.github.com/user", config);

    res.status(200).send(data);
  } catch (error) {
    // const { status, data } = error.response;

    res.status(400).send(error.message);
  }
};

const getUserSocialMedia = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const config = {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${decoded.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };

    const { data } = await axios.get(
      "https://api.github.com/users/bilal-auz/social_accounts",
      config
    );

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getUser, getUserSocialMedia };
