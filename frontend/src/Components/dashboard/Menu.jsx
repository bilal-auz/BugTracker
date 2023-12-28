import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../services/projectServices";

function Menu({ activeTab, activeProject }) {
  // const [activeTab, setActiveTab] = useState("");

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = async () => {
    setIsLoading(true);

    const projects = await fetchProjects();

    setProjects(projects);

    setIsLoading(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    getProjects();
    console.log("activeTab: ", activeTab);
  }, []);
  return (
    <div className="flex flex-col justify-between items-start w-[15rem] h-full">
      <div className="flex flex-col justify-around items-start w-full h-full py-5">
        <div className="flex flex-col justify-center items-center w-full">
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
          <h1 className="font-bold text-s_black text-3xl">Bug Watch</h1>
          <div className="w-full mt-10">
            <ul className="menu px-5">
              <li
                className={
                  "flex flex-row items-center text-s_black rounded" +
                  (activeTab == "dashboard" ? " bg-gray-200" : "")
                }
                // onClick={() => setActiveTab("overview")}
              >
                <a
                  className="text-base w-full"
                  href={`${window.location.origin}/dashboard`}
                >
                  <svg
                    className="w-5 h-5"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm-1.5.5v2h-5v-2zm-9.4-6v8h-5.6v-8zm10.9-7.5c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-1.5.5v8.6h-5v-8.6zm-7.9-.5c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6zm-1.5.5v2.6h-5.6v-2.6z"
                      fill-rule="nonzero"
                    />
                  </svg>
                  Overview
                </a>
              </li>

              <li
                className={
                  "flex flex-row items-center text-s_black rounded w-full" +
                  (activeTab == "projects" ? " bg-gray-200" : "")
                }
              >
                <details className="w-full" open>
                  <summary className="text-base">
                    <svg
                      className="w-5 h-5"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m10.5 17.25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-3.55c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7-2.2c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-6c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7 .25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    Projects
                  </summary>
                  <ul className="pr-2">
                    {projects.map((project) => (
                      <li
                        className={`w-full rounded-lg transition-all duration-200  ${
                          activeProject == project._id
                            ? "bg-gray-900 font-semibold text-white"
                            : ""
                        }`}
                      >
                        <a
                          className=" text-base w-full "
                          href={`${window.location.origin}/projects/${project._id}`}
                        >
                          {activeProject == project._id ? (
                            <svg
                              className="w-4 h-4"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#FFF"
                            >
                              <path d="M22 6h-6v-6l6 6zm-8 2v-8h-12v24h20v-16h-8z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M22 24h-20v-24h14l6 6v18zm-7-23h-12v22h18v-16h-6v-6zm1 5h4.586l-4.586-4.586v4.586z" />
                            </svg>
                          )}
                          {project.name}
                        </a>
                      </li>
                    ))}
                    {/* 
                    <li>
                      <a
                        className="text-base w-full"
                        href={`${window.location.origin}/projects/proj-name2`}
                      >
                        <svg
                          className="w-4 h-4"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 24h-20v-24h14l6 6v18zm-7-23h-12v22h18v-16h-6v-6zm1 5h4.586l-4.586-4.586v4.586z" />
                        </svg>
                        project 2
                      </a>
                    </li> */}
                  </ul>
                </details>
              </li>

              <li
                className={
                  "flex flex-row items-center text-s_black rounded" +
                  (activeTab == "profile" ? " bg-gray-200" : "")
                }
              >
                <a
                  className="text-base w-full"
                  href={`${window.location.origin}/profile`}
                >
                  <svg
                    className="w-5 h-5"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                  </svg>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="menu px-5 w-full">
          <li className="text-s_black">
            <button onClick={handleLogout}>
              <svg
                className="w-5 h-5"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2v20h14v-2h-12v-16h12v-2h-14zm18 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z" />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
