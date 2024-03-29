import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken, redirectToAuthPage } from "../services/OAuthServices";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

function Home() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState("");
  const history = useHistory();

  const loginHandler = async () => {
    setIsLoaded(false);

    if (
      !code &&
      (!localStorage.getItem("accessToken") ||
        !localStorage.getItem("refreshToken"))
    ) {
      await redirectToAuthPage();
    }
    setIsLoaded(true);
  };

  const handleCallBack = async () => {
    setIsLoaded(false);

    const token = await getAccessToken(code);
    setData(token);

    await localStorage.setItem("access_token", token);

    history.push("/dashboard");
  };

  useEffect(() => {
    const init = async () => {
      if (code) return handleCallBack();
    };

    init();
  }, []);

  return (
    <div className="w-screen overflow-y-scroll overflow-x-hidden absolute inset-0">
      <div className="flex flex-col items-center justify-center bg-[#fff]">
        <div className="flex flex-row justify-between w-full max-w-md xl:max-w-7xl items-center px-8 py-4">
          <div className="flex flex-row justtify-center items-center text-2xl font-[mona-bold] cursor-default">
            <svg
              className="w-12"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310.061 310.061"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M167.225,228.349c1.784-2.016,1.815-5.038,0.052-7.076c-27.404-31.764-55.89-47.869-84.681-47.869 c-49.082,0-80.394,46.438-81.704,48.421c-1.286,1.936-1.173,4.493,0.283,6.319c23.121,28.914,49.481,43.571,78.348,43.571 c0.795,0,1.564-0.11,2.354-0.127c0.806,0.054,1.601,0.127,2.417,0.127c4.436,0,8.709-0.652,12.795-1.774 C136.889,261.977,165.85,229.904,167.225,228.349z M95.735,259.159c-4.446,0.939-9.015,1.527-13.703,1.68 c-19.636-1.166-35.258-17.471-35.258-37.387c0-20.683,16.827-37.513,37.51-37.513c20.686,0,37.51,16.835,37.51,37.513 C121.784,240.139,110.822,254.302,95.735,259.159z M12.152,224.576c4.735-6.168,16.557-20.043,33.415-29.817 c-5.968,8.031-9.543,17.941-9.543,28.693c0,10.94,3.704,21.009,9.863,29.113C34.068,246.501,22.78,237.215,12.152,224.576z M126.298,247.106c3.958-6.998,6.241-15.057,6.241-23.649c0-9.448-2.769-18.241-7.478-25.681 c10.318,6.588,20.604,15.519,30.82,26.836C150.825,229.567,140.264,239.058,126.298,247.106z"></path>{" "}
                    <path d="M92.654,196.596c-2.446-1.496-5.294-2.404-8.37-2.404c-3.074,0-5.924,0.908-8.367,2.404 c-9.484,3.999-16.315,14.468-16.315,26.845c0,15.8,11.079,28.673,24.688,28.673c13.611,0,24.69-12.873,24.69-28.673 C108.975,211.08,102.143,200.601,92.654,196.596z M89.654,210.318c0,2.966-2.407,5.374-5.375,5.374 c-2.966,0-5.375-2.408-5.375-5.374c0-1.827,0.969-3.354,2.359-4.336c0.974-0.273,1.979-0.452,3.016-0.452 c1.037,0,2.042,0.179,3.016,0.452C88.694,206.963,89.654,208.491,89.654,210.318z"></path>{" "}
                    <path d="M309.904,59.873c-0.069-0.329-0.101-0.638-0.199-0.945c-0.042-0.108-0.031-0.236-0.089-0.339 c-0.064-0.144-0.184-0.26-0.274-0.399c-0.031-0.063-0.083-0.118-0.109-0.181c-0.179-0.296-0.341-0.577-0.562-0.834 c-0.095-0.098-0.132-0.221-0.241-0.313c-0.011-0.016-0.011-0.031-0.031-0.047c-0.158-0.149-0.357-0.205-0.526-0.333 c-0.268-0.2-0.52-0.394-0.808-0.544c-0.136-0.062-0.252-0.154-0.388-0.209c-0.252-0.102-0.517-0.113-0.778-0.176 c-0.198-0.049-0.356-0.162-0.566-0.183l-139.31-17.019c-0.109-0.016-0.221,0.031-0.335,0.021 c-0.342-0.021-0.641,0.021-0.971,0.066c-0.405,0.047-0.793,0.098-1.177,0.231c-0.231,0.082-0.421,0.215-0.641,0.328 c-0.383,0.215-0.777,0.435-1.112,0.745c-0.073,0.065-0.153,0.086-0.231,0.157l-70.31,70.757c-0.005,0.005-0.01,0.01-0.01,0.01 l-0.005,0.005c-0.027,0.026-0.032,0.062-0.058,0.092c-0.118,0.124-0.184,0.294-0.291,0.436c-0.221,0.284-0.431,0.554-0.596,0.879 c-0.061,0.121-0.157,0.215-0.205,0.341c-0.097,0.236-0.097,0.488-0.154,0.735c-0.055,0.21-0.178,0.389-0.205,0.609 c-0.016,0.116,0.032,0.226,0.021,0.342c0,0.018-0.006,0.028-0.006,0.039c-0.005,0.107-0.065,0.205-0.065,0.318v36.735 c0,2.971,2.405,5.375,5.376,5.375c2.973,0,5.375-2.404,5.375-5.375v-30.614l129.911,16.966v122.996L170.7,256.03 c-2.961-0.258-5.517,1.989-5.747,4.955c-0.221,2.966,1.979,5.539,4.955,5.765l65.408,4.949c0.119,0.011,0.262,0.017,0.393,0.017 l0,0l0,0h0.016c0.714,0,1.396-0.153,2.027-0.405c0.031-0.016,0.052-0.021,0.083-0.036c0.12-0.047,0.211-0.151,0.314-0.216 c0.091-0.042,0.148-0.104,0.221-0.146c0.368-0.211,0.751-0.405,1.05-0.704c0.064-0.062,0.127-0.122,0.179-0.2 c0.031-0.031,0.073-0.041,0.106-0.072l68.987-76.627c0.179-0.193,0.241-0.437,0.377-0.65c0.23-0.342,0.473-0.656,0.62-1.035 c0.12-0.351,0.151-0.74,0.221-1.111c0.041-0.273,0.151-0.52,0.151-0.787V60.711c0-0.021-0.011-0.039-0.011-0.06 C310.035,60.379,309.93,60.132,309.904,59.873z M167.324,49.332l126.06,15.401l-59.695,62.408l-127.175-16.609L167.324,49.332z"></path>{" "}
                    <path d="M284.963,109.08c-2.971,0-5.375,2.402-5.375,5.375v64.318c0,2.971,2.404,5.375,5.375,5.375 c2.977,0,5.376-2.404,5.376-5.375v-64.318C290.339,111.482,287.94,109.08,284.963,109.08z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            <h1 className="font-bold text-s_black text-3xl ml-2 whitespace-nowrap">
              Bug Watch
            </h1>
            <img className="w-8" src="assets/icons/statify-logo.svg" alt="" />
          </div>

          <div className="flex flex-row justify-center items-center flex-wrap">
            <button
              onClick={loginHandler}
              className="btn btn-sm bg-[#2ea043] border-none text-[#fafafa] font-[mona-reg] capitalize hover:scale-105 hover:bg-[#2ea043] rounded-lg btn-md"
            >
              Login
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
              >
                <g fill="#fafafa">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  />
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero flex flex-col justify-center mt-5 lg:mt-32">
          <div className="hero-content flex-col justify-around lg:items-start lg:flex-row py-0">
            <div className="flex flex-col justify-center items-center px-4 lg:px-0 lg:justify-start lg:items-start lg:mt-5 lg:w-[50%] ">
              <h1 className="text-4xl lg:text-5xl font-bold text-left font-[mona-bold] leading-sung text-s_black">
                The bug tracker for your{" "}
                <span className="text-white outline-stroke">GitHub's</span>{" "}
                projects
              </h1>
              <p className="py-2 text-left text-gray-500">
                Track your project's progress, bugs and features with help of{" "}
                <svg
                  className="w-8 inline"
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 310.061 310.061"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M167.225,228.349c1.784-2.016,1.815-5.038,0.052-7.076c-27.404-31.764-55.89-47.869-84.681-47.869 c-49.082,0-80.394,46.438-81.704,48.421c-1.286,1.936-1.173,4.493,0.283,6.319c23.121,28.914,49.481,43.571,78.348,43.571 c0.795,0,1.564-0.11,2.354-0.127c0.806,0.054,1.601,0.127,2.417,0.127c4.436,0,8.709-0.652,12.795-1.774 C136.889,261.977,165.85,229.904,167.225,228.349z M95.735,259.159c-4.446,0.939-9.015,1.527-13.703,1.68 c-19.636-1.166-35.258-17.471-35.258-37.387c0-20.683,16.827-37.513,37.51-37.513c20.686,0,37.51,16.835,37.51,37.513 C121.784,240.139,110.822,254.302,95.735,259.159z M12.152,224.576c4.735-6.168,16.557-20.043,33.415-29.817 c-5.968,8.031-9.543,17.941-9.543,28.693c0,10.94,3.704,21.009,9.863,29.113C34.068,246.501,22.78,237.215,12.152,224.576z M126.298,247.106c3.958-6.998,6.241-15.057,6.241-23.649c0-9.448-2.769-18.241-7.478-25.681 c10.318,6.588,20.604,15.519,30.82,26.836C150.825,229.567,140.264,239.058,126.298,247.106z"></path>{" "}
                        <path d="M92.654,196.596c-2.446-1.496-5.294-2.404-8.37-2.404c-3.074,0-5.924,0.908-8.367,2.404 c-9.484,3.999-16.315,14.468-16.315,26.845c0,15.8,11.079,28.673,24.688,28.673c13.611,0,24.69-12.873,24.69-28.673 C108.975,211.08,102.143,200.601,92.654,196.596z M89.654,210.318c0,2.966-2.407,5.374-5.375,5.374 c-2.966,0-5.375-2.408-5.375-5.374c0-1.827,0.969-3.354,2.359-4.336c0.974-0.273,1.979-0.452,3.016-0.452 c1.037,0,2.042,0.179,3.016,0.452C88.694,206.963,89.654,208.491,89.654,210.318z"></path>{" "}
                        <path d="M309.904,59.873c-0.069-0.329-0.101-0.638-0.199-0.945c-0.042-0.108-0.031-0.236-0.089-0.339 c-0.064-0.144-0.184-0.26-0.274-0.399c-0.031-0.063-0.083-0.118-0.109-0.181c-0.179-0.296-0.341-0.577-0.562-0.834 c-0.095-0.098-0.132-0.221-0.241-0.313c-0.011-0.016-0.011-0.031-0.031-0.047c-0.158-0.149-0.357-0.205-0.526-0.333 c-0.268-0.2-0.52-0.394-0.808-0.544c-0.136-0.062-0.252-0.154-0.388-0.209c-0.252-0.102-0.517-0.113-0.778-0.176 c-0.198-0.049-0.356-0.162-0.566-0.183l-139.31-17.019c-0.109-0.016-0.221,0.031-0.335,0.021 c-0.342-0.021-0.641,0.021-0.971,0.066c-0.405,0.047-0.793,0.098-1.177,0.231c-0.231,0.082-0.421,0.215-0.641,0.328 c-0.383,0.215-0.777,0.435-1.112,0.745c-0.073,0.065-0.153,0.086-0.231,0.157l-70.31,70.757c-0.005,0.005-0.01,0.01-0.01,0.01 l-0.005,0.005c-0.027,0.026-0.032,0.062-0.058,0.092c-0.118,0.124-0.184,0.294-0.291,0.436c-0.221,0.284-0.431,0.554-0.596,0.879 c-0.061,0.121-0.157,0.215-0.205,0.341c-0.097,0.236-0.097,0.488-0.154,0.735c-0.055,0.21-0.178,0.389-0.205,0.609 c-0.016,0.116,0.032,0.226,0.021,0.342c0,0.018-0.006,0.028-0.006,0.039c-0.005,0.107-0.065,0.205-0.065,0.318v36.735 c0,2.971,2.405,5.375,5.376,5.375c2.973,0,5.375-2.404,5.375-5.375v-30.614l129.911,16.966v122.996L170.7,256.03 c-2.961-0.258-5.517,1.989-5.747,4.955c-0.221,2.966,1.979,5.539,4.955,5.765l65.408,4.949c0.119,0.011,0.262,0.017,0.393,0.017 l0,0l0,0h0.016c0.714,0,1.396-0.153,2.027-0.405c0.031-0.016,0.052-0.021,0.083-0.036c0.12-0.047,0.211-0.151,0.314-0.216 c0.091-0.042,0.148-0.104,0.221-0.146c0.368-0.211,0.751-0.405,1.05-0.704c0.064-0.062,0.127-0.122,0.179-0.2 c0.031-0.031,0.073-0.041,0.106-0.072l68.987-76.627c0.179-0.193,0.241-0.437,0.377-0.65c0.23-0.342,0.473-0.656,0.62-1.035 c0.12-0.351,0.151-0.74,0.221-1.111c0.041-0.273,0.151-0.52,0.151-0.787V60.711c0-0.021-0.011-0.039-0.011-0.06 C310.035,60.379,309.93,60.132,309.904,59.873z M167.324,49.332l126.06,15.401l-59.695,62.408l-127.175-16.609L167.324,49.332z"></path>{" "}
                        <path d="M284.963,109.08c-2.971,0-5.375,2.402-5.375,5.375v64.318c0,2.971,2.404,5.375,5.375,5.375 c2.977,0,5.376-2.404,5.376-5.375v-64.318C290.339,111.482,287.94,109.08,284.963,109.08z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>{" "}
                <span className="text-s_black font-bold font-[mona-bold]">
                  Bug Watch.
                </span>
              </p>
              <div className="mb-2">
                <button
                  class="btn btn-wide btn-sm bg-[#000] border-none text-[#fafafa] font-[mona-reg] capitalize hover:bg-s_green rounded-lg btn-md"
                  onClick={loginHandler}
                >
                  {(!isLoaded && (
                    <span className="loading loading-spinner"></span>
                  )) || (
                    <React.Fragment>
                      <svg
                        className="w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 128"
                      >
                        <g fill="#fafafa">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                          />
                          <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
                        </g>
                      </svg>
                      Login with Github
                    </React.Fragment>
                  )}
                </button>
                <div className="flex justify-end w-full px-2">
                  <p className="text-right flex flex-row text-sm text-[#000] font-[mona-med] mr-2">
                    Powered by
                  </p>
                  <svg
                    className="w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-.122 175.062 480.244 129.875"
                    id="github"
                  >
                    <g fill="#121110">
                      <path d="M92.375 230.65H52.019a1.887 1.887 0 0 0-1.886 1.886v19.731a1.89 1.89 0 0 0 1.886 1.889h15.743v24.513s-3.535 1.206-13.308 1.206c-11.53 0-27.637-4.214-27.637-39.632 0-35.425 16.772-40.087 32.518-40.087 13.63 0 19.502 2.401 23.238 3.556 1.174.36 2.26-.808 2.26-1.851l4.502-19.063c0-.487-.165-1.075-.721-1.474-1.517-1.082-10.774-6.262-34.16-6.262-26.941 0-54.576 11.463-54.576 66.562 0 55.103 31.64 63.313 58.302 63.313 22.076 0 35.468-9.434 35.468-9.434.552-.306.612-1.077.612-1.431v-61.537c0-1.04-.844-1.885-1.885-1.885M300.354 181.664a1.88 1.88 0 0 0-1.873-1.896h-22.724a1.889 1.889 0 0 0-1.882 1.896l.006 43.913h-35.419v-43.913a1.882 1.882 0 0 0-1.875-1.896h-22.722a1.887 1.887 0 0 0-1.877 1.896v118.904c0 1.048.843 1.901 1.877 1.901h22.722c1.039 0 1.875-.854 1.875-1.901v-50.86h35.419l-.062 50.86c0 1.048.844 1.901 1.883 1.901h22.777c1.041 0 1.873-.854 1.875-1.901V181.664M135.254 197.268c0-8.183-6.56-14.795-14.653-14.795-8.085 0-14.65 6.612-14.65 14.795 0 8.173 6.565 14.802 14.65 14.802 8.093 0 14.653-6.629 14.653-14.802M133.629 275.486V220.6a1.89 1.89 0 0 0-1.88-1.895h-22.651c-1.039 0-1.969 1.072-1.969 2.115v78.634c0 2.312 1.44 2.998 3.304 2.998h20.408c2.239 0 2.788-1.1 2.788-3.034v-23.932M386.71 218.884h-22.549c-1.034 0-1.876.852-1.876 1.901v58.302s-5.729 4.192-13.859 4.192c-8.13 0-10.287-3.689-10.287-11.65v-50.844c0-1.049-.841-1.901-1.875-1.901h-22.886c-1.032 0-1.879.852-1.879 1.901v54.693c0 23.646 13.179 29.431 31.31 29.431 14.873 0 26.864-8.216 26.864-8.216s.571 4.329.829 4.843c.259.512.932 1.029 1.659 1.029l14.56-.064c1.032 0 1.879-.854 1.879-1.898l-.008-79.817c0-1.05-.843-1.902-1.882-1.902M439.445 283.207c-7.821-.238-13.126-3.788-13.126-3.788v-37.653s5.233-3.208 11.654-3.782c8.12-.727 15.944 1.726 15.944 21.095.001 20.426-3.53 24.457-14.472 24.128zm8.894-66.993c-12.807 0-21.518 5.714-21.518 5.714v-40.263c0-1.05-.839-1.897-1.875-1.897h-22.787a1.887 1.887 0 0 0-1.878 1.897v118.903c0 1.048.842 1.901 1.881 1.901h15.811c.711 0 1.25-.367 1.648-1.009.393-.639.96-5.482.96-5.482s9.318 8.83 26.957 8.83c20.708 0 32.584-10.504 32.584-47.154 0-36.651-18.967-41.44-31.783-41.44M198.936 218.695h-17.045l-.026-22.519c0-.852-.439-1.278-1.424-1.278h-23.228c-.903 0-1.388.398-1.388 1.265v23.271s-11.64 2.809-12.427 3.037a1.886 1.886 0 0 0-1.361 1.812v14.623c0 1.052.84 1.898 1.879 1.898h11.909v35.178c0 26.13 18.328 28.697 30.696 28.697 5.651 0 12.411-1.814 13.527-2.228.675-.248 1.067-.947 1.067-1.705l.019-16.086c0-1.05-.886-1.897-1.884-1.897-.993 0-3.534.404-6.15.404-8.372 0-11.209-3.893-11.209-8.932l-.001-33.432h17.046c1.039 0 1.88-.847 1.88-1.898v-18.317a1.884 1.884 0 0 0-1.88-1.893" />
                    </g>
                  </svg>
                  {/* <img
          className="w-12"
          src="assets/icons/spotify-logo-text.svg"
          alt=""
        /> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end relative h-full">
              <img
                src="assets/mockups/desktop-2.svg"
                className="max-w-sm lg:max-w-lg rounded-lg "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full bg-gray-200 px-2 lg:px-0">
        <div className="mb-10 w-[80%] max-w-md md:max-w-7xl">
          <div className="bg-[#121212] rounded-md w-full">
            <div className="px-3 pt-5 mt-24 max-w-md md:max-w-7xl">
              <h1 className="font-[mona-bold] text-[#F1f1f1] text-3xl lg:text-4xl">
                Organize your Github Repositories
              </h1>
              <p className="py-2  text-gray-200 font-[mona-med] text-xl">
                Track and separte your GitHub repositories using Bug Watch
                Projects
              </p>
            </div>
            <div className="w-full max-w-md md:max-w-7xl items-center px-8 py-4 ">
              <img
                className="rounded-lg"
                src="assets/mockups/dashboard-2.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between pt-3 items-center w-[50%] bg-[#121212] w-[80%] max-w-md md:max-w-7xl rounded-lg pl-5 md:pl-14 md:pt-8 mb-5">
          <div className="flex flex-col items-start w-[50%] md:w-[30%]">
            <h1 className="text-left text-s_white  md:whitespace-nowrap font-[mona-bold] xl:text-4xl">
              Github Profile Overview
            </h1>
            <p className="mb-2 lg:mb-0 lg:py-2 text-gray-200  text-left font-[mona-med] text-xs lg:text-xl">
              Hunt your Bugs now!
            </p>
            <div className="flex flex-row justify-start items-center p-5 md:p-0">
              <button
                onClick={loginHandler}
                className="btn btn-xs text-xs md:text-lg bg-[#fff] text-[#000] font-[mona-bold] capitalize rounded-lg md:btn-md hover:scale-105 hover:bg-[#fff] hover:text-[#000]"
              >
                Login
                <svg
                  className="w-3 lg:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                >
                  <g fill="#000">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                    />
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-end w-[50%] xl:w-[60%]">
            <img
              className="rounded-l-lg md:rounded-tl-lg md:rounded-l-none"
              src="assets/mockups/profile.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <footer className="footer flex flex-row items-center justify-center bg-[#121212] text-base-content pt-5 pb-5">
        <aside>
          <p className="inline text-s_green ml-2 text-base">
            Copyright © 2023 By
            <a href="https://www.linkedin.com/in/bilal-abouzid" target="_blank">
              {" "}
              @bilal-auz
            </a>
          </p>
        </aside>

        <nav className="flex flex-row">
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/bilal-auz" target="_blank">
              <img src="assets/icons/github-icon.svg" alt="" />
            </a>
            <a href="https://www.linkedin.com/in/bilal-abouzid" target="_blank">
              <img
                className="rounded-sm"
                src="assets/icons/linkedin-icon.svg"
                alt=""
              />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Home;
