const axios = require("axios");
const jwt = require("jsonwebtoken");

//https://api.github.com/orgs/ORG/repos
const getRepos = async (req, res) => {
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

    const { data } = await axios.get(
      "https://api.github.com/user/repos",
      config
    );

    res.status(200).send(data);
  } catch (error) {
    // const { status, data } = error.response;

    res.status(400).send(error.message);
  }
};

const getPinnedRepos = async (req, res) => {
  try {
    const access_token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    const { username } = req.body;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${decoded.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };
    axios({
      url: "https://api.github.com/graphql",
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${decoded.access_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      data: {
        query: `
          query GetPinnedRepos {
            user(login: "${username}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    primaryLanguage {
                      name,
                      color
                    }
                    createdAt,
                    description,
                    url
                  }
                }
              }
            }
          }
          `,
      },
    }).then((result) => {
      console.log(username);
      res.status(200).send(result.data.data.user?.pinnedItems?.nodes);
    });
    // const { data } = await axios.post(
    //   "https://gh-pinned-repos-5l2i19um3.vercel.app/?username=bilal-auz",
    //   config
    // );
    // res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getRepos, getPinnedRepos };
