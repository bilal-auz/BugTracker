import axios from "axios";

export const fetchUser = async () => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.get(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/user/getUser",
    config
  );

  return data;
};

export const getUserSocialMedia = async () => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  //   const { data } = await axios.get(
  //     process.env.REACT_APP_BACKEND_ENDPOINT + "/user/getUserSocialMedia",
  //     config
  //   );

  const data = [];

  return data;
};
