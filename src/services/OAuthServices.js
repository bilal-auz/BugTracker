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
  //   params.append(
  //     "scope",
  //     "user-read-private user-read-email user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played"
  //   );

  document.location.href =
    process.env.REACT_APP_OAUTH_ENDPOINT +
    "/authorize" +
    "?" +
    params.toString();
}

// 2. get access token: /access_token
export async function getAccessToken(code) {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);

  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const { data } = await axios.post(
    process.env.REACT_APP_OAUTH_ENDPOINT + "/access_token" + `?${params}`,
    config
  );

  /*
    {
      "access_token": "",
      "expires_in": 28800, 8 hours
      "refresh_token": "",
      "scope": ""
      "token_type": "Bearer",
    }
  */

  return data;
}
