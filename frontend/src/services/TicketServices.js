import axios from "axios";

export const addNewTicket = async (newTicket) => {
  const access_token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${access_token}`,
    },
  };

  const { data } = await axios.post(
    process.env.REACT_APP_BACKEND_ENDPOINT + "/tickets/addTicket",
    newTicket,
    config
  );

  return data;
};