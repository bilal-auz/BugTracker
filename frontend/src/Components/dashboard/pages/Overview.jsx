import React, { useEffect, useState } from "react";

import Project from "./Project";

function Overview() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const [repos, setRepos] = useState([
    { name: "repo1", value: "repo1" },
    { name: "repo2", value: "repo2" },
  ]);
  const [selectedRepo, setSelectedRepo] = useState("");

  const addNewProject = () => {
    console.log(newProjectName, selectedRepo);
  };

  const openProject = () => {
    console.log("open project");
    // forward to project/project_id
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

  const loadProjects = () => {
    // fetch projects from backend
    const projects = [
      { name: "ashdkjad", bugs: 3, features: 5, createdAt: "3/11/2021" },
      { name: "aksdad", bugs: 1, features: 8, createdAt: "3/11/2022" },
      { name: "askndej", bugs: 5, features: 2, createdAt: "3/11/2023" },
    ];

    setProjects(projects);
    setFilteredProjects(projects);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="px-8 bg-[#f6f8fa] h-full">
      <div className="flex flex-row mt-10 rounded bg-[#f6f8fa]">
        <div className="mr-5">
          <svg
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
          </svg>
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-3xl font-bold text-s_black">All Projects</p>
          <p className="text-lg text-s_black">List of all created projects</p>
        </div>
      </div>

      <div className="bg-[#FFF] px-5 py-2 rounded border-2">
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
              className="btn bg-[#0366d6] text-[#FFF] border-none"
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
                  >
                    {repos.map((repo) => (
                      <option>{repo.name}</option>
                    ))}
                  </select>
                </label>
                <div className="flex">
                  <form method="dialog" className="mr-5">
                    <button className="btn w-20 bg-[#d6dade] text-gray-600">
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
          </div>

          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="">
                  <tr className="text-xs text-gray-400 border-gray-200">
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Bugs</th>
                    <th>Features</th>
                    <th>Created at</th>
                  </tr>
                </thead>
                <tbody className="">
                  {/* row 1 */}
                  {filteredProjects.map((project, index) => (
                    <tr
                      className="text-base text-s_black border-gray-200 hover:bg-[#f6f8fa] cursor-pointer"
                      onClick={openProject}
                    >
                      <th>{index + 1}</th>
                      <td>{project.name}</td>
                      <td>{project.bugs}</td>
                      <td>{project.features}</td>
                      <td>{project.createdAt}</td>
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
