import axios from "axios";

//1. redirect To Github login page: /authorize
export async function redirectToAuthPage() {
  console.log("start redirect");

  const params = new URLSearchParams();
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append(
    "redirect_uri",
    encodeURI(process.env.REACT_APP_CALLBACK_ENDPOINT)
  );
  params.append("scope", "repo user");

  document.location.href =
    process.env.REACT_APP_OAUTH_ENDPOINT +
    "/authorize" +
    "?" +
    params.toString();
}

// 2. get access token: /auth/callback
export async function getAccessToken(code) {
  const config = {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = {
    code: code,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  };

  const { data } = await axios.post(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/auth/callback",
    body,
    config
  );

  // check if auth is done and JWT is returend than return data to Home.jsx and forward to dashboard

  /*
    {
      "access_token": "",
      "scope": ""
      "token_type": "Bearer",
    }
  */

  return data;
}

export async function isAuth() {
  if (!localStorage.getItem("access_token")) return false;

  try {
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

    return true;
  } catch (err) {
    return false;
  }
}
