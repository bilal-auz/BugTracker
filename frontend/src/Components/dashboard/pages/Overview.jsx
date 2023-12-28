import React, { useEffect, useState } from "react";
import { fetchRepos } from "../../../services/RepoServices";
import {
  addProject,
  deleteProject,
  fetchProjects,
  updatedProject,
} from "../../../services/projectServices";
import { fetchUser } from "../../../services/userServices";
import { set } from "mongoose";

function Overview() {
  const [userInfo, setUserInfo] = useState();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [activeProject, setActiveProject] = useState(undefined);
  const [repos, setRepos] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [updatedTitles, setUpdatedTitles] = useState({});

  const addNewProject = () => {
    console.log(newProjectName, selectedRepo);
    const repo_link = document.getElementById(selectedRepo).dataset.repoLink;

    addProject(newProjectName, selectedRepo, repo_link);
    setNewProjectName("");
    setSelectedRepo(repos[0].id);

    loadProjects();

    document.getElementById("cancelBtn").click();
  };

  const handleSearch = (e) => {
    if (e.target.value == "") return setFilteredProjects(projects);

    const filteredProjects = projects.filter((project) =>
      project.name.includes(e.target.value)
    );

    setFilteredProjects(filteredProjects);
  };

  const handleSort = (e) => {
    const sortType = e.target.value;
    let sortedProjects = [];
    if (sortType == "createdAt") {
      sortedProjects = projects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortType == "bug") {
      sortedProjects = projects.sort((a, b) => b.bugs - a.bugs);
    } else if (sortType == "feature") {
      sortedProjects = projects.sort((a, b) => b.features - a.features);
    }

    setFilteredProjects([...sortedProjects]);
  };

  const loadProjects = async () => {
    // fetch projects from backend
    // const projects = [
    //   { name: "ashdkjad", bugs: 3, features: 5, createdAt: "3/11/2021" },
    //   { name: "aksdad", bugs: 1, features: 8, createdAt: "3/11/2022" },
    //   { name: "askndej", bugs: 5, features: 2, createdAt: "3/11/2023" },
    // ];

    const projects = await fetchProjects();
    setProjects(projects);
    setFilteredProjects(projects);
  };

  const loadUserInfo = async () => {
    // fetch user info from backend
    const userInfo = await fetchUser();
    setUserInfo(userInfo);
  };

  const loadRepos = async () => {
    setIsLoading(true);
    const data = await fetchRepos();
    setRepos(data);
    setSelectedRepo(data[0].id);
    // console.log(data);
    setIsLoading(false);
  };

  const editProjectName = (e, projectId) => {
    // make it effienct by adding delay and update after some delay when user stops typing

    setUpdatedTitles((prevs) => ({ ...prevs, [projectId]: e.target.value }));
    // const updatedProjects = projects.map((project) =>
    //   project._id === projectId ? { ...project, name: e.target.value } : project
    // );

    // setProjects(updatedProjects);
    // setFilteredProjects(updatedProjects);
  };

  const activateInput = (e, name, projectId) => {
    // setNewProjectName(name);
    // e.target.value = name;
    document.getElementById(projectId + "input").focus();
  };

  const editTitle = (orignalTitle, newTitle, newTitleId) => {
    //Only update if not empty
    if (newTitle !== "") {
      // update title in frontend
      filteredProjects.find((project) => project._id == newTitleId).name =
        newTitle;
      // hide edit button
    } else {
      //if empty revert back to orignal title
      document.getElementById(newTitleId + "input").value = orignalTitle;
    }
    setActiveProject("");

    // hide input
    document.getElementById(newTitleId + "input").disabled = true;
    document.getElementById(newTitleId + "input").disabled = false;

    // update title in backend
  };

  const removeProject = (projectId) => {
    // delete project in frontend
    const newProjects = projects.filter((project) => project._id != projectId);
    setProjects([...newProjects]);
    setFilteredProjects([...newProjects]);
    document.getElementById("cancelBtn" + projectId).click();

    // delete project in backend
    deleteProject(projectId);
  };

  useEffect(() => {
    loadProjects();
    loadRepos();
    loadUserInfo();
  }, []);

  return (
    <div className="bg-[#f6f8fa] h-full px-8">
      <div className="flex flex-col items-start mt-5 rounded bg-[#f6f8fa]">
        <div className="mb-2">
          <div className="flex items-start">
            <p className="text-s_black text-base font-extrabold">
              HI {userInfo?.name},
            </p>
          </div>
          {/* <svg
            className="w-24"
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
          </svg> */}
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-3xl font-bold text-s_black">All Projects</p>
          <p className="text-lg text-s_black">List of all created projects</p>
        </div>
      </div>

      <div className="bg-[#FFF] px-5 py-2 rounded border-2 mb-10">
        <div className="flex flex-row justify-between mt-5 mb-3 w-full">
          <div className="w-[70%]">
            <label className="form-control ghost">
              <div className="label">
                <span className="label-text text-s_black">Search Project</span>
              </div>
              <input
                type="text"
                placeholder="Project name..."
                className="input input-bordered input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
                onChange={handleSearch}
              />
            </label>
          </div>

          <label className="form-control w-[18%]">
            <div className="label">
              <span className="label-text text-s_black">Sort project by</span>
            </div>
            <select
              className="select select-bordered select-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
              defaultValue={"date"}
              onChange={handleSort}
            >
              <option value={"createdAt"}>Date</option>
              <option value={"bug"}>Bugs</option>
              <option value={"feature"}>Features</option>
            </select>
          </label>
        </div>

        <div className="rounded px-3 py-1">
          <div className="flex mt-5 mb-4">
            <button
              className={
                "btn bg-[#0366d6] text-[#FFF] border-none " +
                (isLoading && "loading")
              }
              onClick={() => document.getElementById("addProject").showModal()}
            >
              <svg
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" fill="#FFF" />
              </svg>
              Add Project
            </button>
            {!isLoading && (
              <dialog id="addProject" className="modal">
                <div className="modal-box flex flex-col justify-center items-center rounded-xl bg-[#FFF] border-2 ">
                  <h2 className="text-left w-full text-s_black font-bold">
                    Add new Project
                  </h2>
                  <label className="form-control w-full flex flex-col mb-5">
                    <div className="label">
                      <span className="label-text text-s_black">
                        Project Name
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      value={newProjectName}
                      className="input input-bordered w-full mb-5 input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <div className="label">
                      <span className="label-text text-s_black">
                        Select Repository
                      </span>
                    </div>
                    <select
                      type="text"
                      placeholder="Type here"
                      className="select input-bordered w-full input input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
                      onChange={(e) => setSelectedRepo(e.target.value)}
                      value={selectedRepo}
                    >
                      {repos.map((repo) => (
                        <option
                          className="h-[50px]"
                          id={repo.id}
                          value={repo.id}
                          data-repo-link={repo.html_url}
                        >
                          {repo.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="flex">
                    <form method="dialog" className="mr-5">
                      <button
                        id="cancelBtn"
                        className="btn w-20 bg-[#d6dade] text-gray-600"
                      >
                        Cancel
                      </button>
                    </form>

                    <button
                      className="btn w-20 bg-[#0366d6] text-[#FFF]"
                      onClick={addNewProject}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            )}
          </div>

          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead className="">
                  <tr className="text-xs text-gray-400 border-gray-200">
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Bugs</th>
                    <th className="">Features</th>
                    <th className="w-[200px]">Created at</th>
                    <th className="w-[50px]">Project Link</th>
                    <th className="w-[50px]">Repo Link</th>
                    <th className="w-[50px]">Delete</th>
                  </tr>
                </thead>
                <tbody className="">
                  {!isLoading &&
                    filteredProjects.map((project, index) => (
                      <tr className="text-base text-s_black border-gray-200 hover:bg-[#f6f8fa] cursor-pointer">
                        <th>{index + 1}</th>
                        <td id={project._id} className="flex relative w-full">
                          <input
                            className="bg-transparent w-full border-b-2 border-transparent hover:border-[#e5e7eb] hover:border-b-2 focus:outline-none focus:border-[#0366d6]"
                            id={project._id + "input"}
                            value={updatedTitles[project._id] || project.name}
                            disabled={false}
                            // defaultValue={project.name}
                            onMouseEnter={() =>
                              // displayEditButton(index + 1 + "editBtn")
                              setActiveProject(project._id)
                            }
                            onMouseLeave={() =>
                              // hideEditButton(index + 1 + "editBtn")
                              setActiveProject("")
                            }
                            onChange={(e) => editProjectName(e, project._id)}
                            onClick={(e) =>
                              activateInput(e, project.name, project._id)
                            }
                            onKeyUp={(e) => {
                              e.key === "Enter" &&
                                updatedProject(
                                  project._id,
                                  updatedTitles[project._id]
                                );
                            }}
                          />

                          <div className="w-full ml-2 relative">
                            {activeProject == project._id && (
                              <button
                                id={project._id + "editBtn"}
                                className="block absolute"
                                onClick={(e) => {
                                  editTitle(project._id + "title");
                                }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6"
                                >
                                  <path d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                        <td>{project.bugs}</td>
                        <td>{project.features}</td>
                        <td className="w-fit">
                          {new Date(project.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "2-digit", year: "numeric" }
                          )}
                        </td>
                        <td className="text-center">
                          <a
                            href={`/projects/${project._id}`}
                            className="inline-block"
                          >
                            <svg
                              className="w-7 fill-current text-gray-400 hover:text-black hover:scale-125 transition-all duration-200"
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
                          </a>
                        </td>
                        <td className="text-center">
                          <a href={project.repoLink} className="inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="fill-current text-gray-400 rounded-lg w-7 p-1 transition-all duration-200 hover:text-black hover:scale-125"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        </td>
                        <td className="text-center">
                          <button
                            id={project._id}
                            onClick={() => {
                              document
                                .getElementById(`del${project._id}`)
                                .showModal();
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-7 p-1 fill-current text-gray-400 hover:text-red-500 hover:scale-125 transition-all duration-200"
                            >
                              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />
                            </svg>
                          </button>
                          <dialog id={`del${project._id}`} className="modal">
                            <div className="modal-box flex flex-col justify-center items-center rounded-xl bg-[#FFF] border-2 ">
                              <h2 className="text-center w-fit text-s_black font-bold text-lg">
                                Are your sure?
                              </h2>
                              <div className="divider mb-0"></div>
                              <p className="text-sm">
                                Note deleting the project won't affect the
                                associated GitHub repo.
                              </p>

                              <div className="flex mt-5">
                                <form method="dialog" className="mr-5">
                                  <button
                                    id={"cancelBtn" + project._id}
                                    className="btn w-20 bg-[#0366d6] text-[#FFF]"
                                  >
                                    Cancel
                                  </button>
                                </form>

                                <button
                                  className="btn w-20 border-red-400  text-red-400 bg-white hover:bg-red-500 hover:text-white hover:border-red-500"
                                  onClick={() => removeProject(project._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
