import React, { useEffect, useState } from "react";
import { fetchProject } from "../../../services/projectServices";
import { addNewTicket } from "../../../services/TicketServices";

function Project({ projectId }) {
  const [project, setproject] = useState();
  //   {
  //   name: "project_name",
  //   createdAt: "March 17, 2023",
  //   tickets: [
  //     {
  //       name: "Fix_Login_Issue",
  //       desc: "Users unable to log in",
  //       label: "Bug",
  //       critical: true,
  //       isOpened: true,
  //       createdAt: "October 15, 2022",
  //     },
  //     {
  //       name: "Improve_Performance",
  //       desc: "Optimize page loading times",
  //       label: "Feature",
  //       critical: true,
  //       isOpened: false,
  //       createdAt: "November 28, 2022",
  //     },
  //     {
  //       name: "Update_UI_Design",
  //       desc: "Apply new design elements",
  //       label: "Feature",
  //       critical: false,
  //       isOpened: true,
  //       createdAt: "January 5, 2023",
  //     },
  //     {
  //       name: "Critical_Bug_Fix",
  //       desc: "Resolve new critical security vulnerability",
  //       label: "Bug",
  //       critical: false,
  //       isOpened: true,
  //       createdAt: "March 10, 2023",
  //     },
  //     // {
  //     //   name: "ti5",
  //     //   desc: "fix issue on loading",
  //     //   label: "Bug",
  //     //   critical: true,
  //     //   status: "Open",
  //     //   createdAt: "March 17, 2023",
  //     // },
  //     // {
  //     //   name: "ti6",
  //     //   desc: "fix issue on loading",
  //     //   label: "Bug",
  //     //   critical: true,
  //     //   status: "Open",
  //     //   createdAt: "March 17, 2023",
  //     // },
  //     // {
  //     //   name: "ti7",
  //     //   desc: "fix issue on loading",
  //     //   label: "Bug",
  //     //   critical: true,
  //     //   status: "Open",
  //     //   createdAt: "March 17, 2023",
  //     // },
  //     // {
  //     //   name: "ti8",
  //     //   desc: "fix issue on loading",
  //     //   label: "Bug",
  //     //   critical: true,
  //     //   status: "Open",
  //     //   createdAt: "March 17, 2023",
  //     // },
  //   ],
  //   totalTickets: 8,
  //   closedTickets: 3,
  //   openTickets: 5,
  // }
  const [activeStatus, setActiveStatus] = useState("all");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeLabel, setActiveLabel] = useState("");
  const [criticalLabel, setCriticalLabel] = useState("");
  const [newTicketName, setNewTicketName] = useState("");
  const [SelectedLabel, setSelectedLabel] = useState("");
  const [SelectedCritical, setSelectedCritical] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.target.value == "") return setFilteredTickets(project.tickets);
    const filteredTickets = project.tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTickets(filteredTickets);
  };

  const handleSort = (e) => {
    setActiveLabel("");
    setActiveStatus("all");
    setCriticalLabel("");

    const sortType = e.target.value;
    let sortedTickets = [];
    if (sortType == "createdAt") {
      sortedTickets = filteredTickets.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        // Sort by createdAt date in descending order
        if (dateA < dateB && b.status == "open") return 1;
        if (dateA > dateB && a.status == "open") return -1;

        // If createdAt dates are equal, prioritize isOpened true tickets
        return a.status == "open" && b.status == "closed" ? -1 : 1;
      });
    } else if (sortType == "priority") {
      sortedTickets = filteredTickets.sort(
        (a, b) => Number(b.priority) - Number(a.priority)
      );
    }

    setFilteredTickets([...sortedTickets]);
  };

  const handleIsOpenFilter = (status) => {
    setActiveStatus(status);

    if (status == "all") return setFilteredTickets(project.tickets);

    let filteredTickets = [];

    if (status == "open") {
      filteredTickets = project.tickets.filter((ticket) => {
        return ticket.status == "open";
      });
    } else if (status == "closed") {
      filteredTickets = project.tickets.filter((ticket) => {
        return ticket.status == "closed";
      });
    }

    setFilteredTickets(filteredTickets);
  };

  const handleLabelFilter = (label) => {
    if (label == activeLabel) {
      setActiveLabel("");

      if (criticalLabel == "critical") {
        const newFilteredTickets = project.tickets.filter((ticket) => {
          return ticket.critical;
        });
        return setFilteredTickets(newFilteredTickets);
      }

      return setFilteredTickets(project.tickets);
    }
    setActiveLabel(label);

    if (criticalLabel == "critical") {
      const newFilteredTickets = project.tickets.filter((ticket) => {
        return ticket.critical && ticket.label == label;
      });
      return setFilteredTickets(newFilteredTickets);
    }

    const filteredTickets = project.tickets.filter((ticket) => {
      return ticket.label == label;
    });

    setFilteredTickets(filteredTickets);
  };

  const handleCriticalFilter = (critical) => {
    if (critical == criticalLabel) {
      setCriticalLabel("");
      console.log("activeLabel", activeLabel);

      if (activeLabel == "") return setFilteredTickets(project.tickets);

      const newFilteredTickets = project.tickets.filter((ticket) => {
        return ticket.label == activeLabel;
      });

      console.log(newFilteredTickets);

      return setFilteredTickets(newFilteredTickets);
    }
    setCriticalLabel(critical);

    const newFilteredTickets = filteredTickets.filter((ticket) => {
      return ticket.priority;
    });

    setFilteredTickets(newFilteredTickets);
  };

  const clearFilters = (e) => {
    setActiveLabel("");
    setCriticalLabel("");
    setActiveStatus("all");
    setFilteredTickets(project.tickets);
  };

  const addTicket = (e) => {
    if (newTicketName == "") return alert("Please enter a ticket name");
    const newTicket = {
      title: newTicketName,
      desc: "sss",
      label: SelectedLabel,
      priority: SelectedCritical,
      status: "open",
      projectId: project._id,
    };

    console.log(newTicket);

    // call to backend to add new ticket
    addNewTicket(newTicket);

    setSelectedLabel("");
    setSelectedCritical(false);
    setNewTicketName("");

    document.getElementById("closeNewTicketForm").click();
  };

  const loadProject = async () => {
    setIsLoading(true);
    const data = await fetchProject(projectId);

    console.log(data);
    setproject(data);
    setFilteredTickets(data.tickets);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="h-full px-8 py-8 bg-[#f6f8fa] ">
      <div className="flex flex-row items-end">
        <h3 className="capitalize text-s_black font-bold mr-1">
          {project?.name}
        </h3>
        <p className="text-base text-gray-600 font-semibold">
          Created on {project?.createdAt}
        </p>
      </div>

      <div className="flex flex-row justify-between w-full mt-8">
        <div className="stats shadow rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
          <div className="stat">
            <div className="stat-title mb-5">
              <svg
                className="w-8"
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-344.87 -344.87 1675.07 1675.07"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                  <rect
                    x="-344.87"
                    y="-344.87"
                    width="1675.07"
                    height="1675.07"
                    rx="100.5042"
                    fill="#0366d6"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M868.565,492.8c-4.4,22.101-24,38.2-47.5,39.2c-7.4,0.3-13.7,5.7-15.101,13c-1.5,7.3,2.2,14.7,8.9,17.8 c21.3,10,33.2,32.4,28.7,54.5l-4.2,21c-5.5,27.7-36.101,45-62.9,38.4c-7.5-1.8-15.2-3.2-22.8-4.7c-11.2-2.2-22.4-4.5-33.6-6.7 c-14.801-3-29.601-5.899-44.4-8.899c-17.6-3.5-35.3-7.101-52.9-10.601c-19.699-4-39.399-7.899-59.1-11.899 c-21-4.2-42.1-8.4-63.1-12.7c-21.601-4.3-43.2-8.7-64.7-13c-21.4-4.3-42.7-8.601-64.101-12.9c-20.399-4.1-40.8-8.2-61.199-12.3 c-18.7-3.7-37.3-7.5-56-11.2c-16.2-3.2-32.4-6.5-48.5-9.7c-12.9-2.6-25.8-5.199-38.8-7.8c-8.9-1.8-17.801-3.6-26.7-5.399 c-4.101-0.801-8.2-1.7-12.3-2.5c-0.2,0-0.4-0.101-0.601-0.101c2.2,10.4,1.2,21.5-3.6,31.9c-10.101,21.8-33.601,33.2-56.2,28.8 c-6.7-1.3-14,1.2-16.9,7.4l-9,19.5c-2.899,6.199,0,13.399,5.301,17.699c1,0.801,721.8,333.101,722.999,333.4 c6.7,1.3,14-1.2,16.9-7.4l9-19.5c2.9-6.199,0-13.399-5.3-17.699c-18-14.301-24.601-39.601-14.5-61.4c10.1-21.8,33.6-33.2,56.2-28.8 c6.699,1.3,14-1.2,16.899-7.4l9-19.5c2.9-6.2,0-13.399-5.3-17.7c-18-14.3-24.6-39.6-14.5-61.399s33.6-33.2,56.2-28.8 c6.7,1.3,14-1.2,16.9-7.4l9-19.5c2.899-6.2,0-13.4-5.301-17.7c-18-14.3-24.6-39.6-14.5-61.4c10.101-21.8,33.601-33.199,56.2-28.8 c6.7,1.3,14-1.2,16.9-7.399l9.899-21.601c2.9-6.2,0.2-13.5-6-16.399l-107.699-49.7L868.565,492.8z"></path>{" "}
                    <path d="M9.665,485.9c1.2,0.6,779.3,156.699,780.6,156.699c6.801-0.3,13.4-4.5,14.7-11.1l4.2-21c1.3-6.7-3.1-13.1-9.3-16 c-20.8-9.8-33.101-32.8-28.4-56.4c4.7-23.6,25-40.1,48-41.1c6.8-0.3,13.4-4.5,14.7-11.1l3.1-15.4l1.101-5.7 c1.3-6.7-3.101-13.1-9.3-16c-20.801-9.8-33.101-32.8-28.4-56.399c4.7-23.601,25-40.101,48-41.101c6.8-0.3,13.4-4.5,14.7-11.1 l4.2-21c1.3-6.7-3.101-13.1-9.301-16c-20.8-9.8-33.1-32.8-28.399-56.4c4.7-23.6,25-40.1,48-41.1c6.8-0.3,13.399-4.5,14.7-11.1 l4.699-23.3c1.301-6.7-3-13.2-9.699-14.5c0,0-781.9-156.8-782.7-156.8c-5.8,0-10.9,4.1-12.1,9.9l-4.7,23.3 c-1.3,6.7,3.1,13.1,9.3,16c20.8,9.8,33.1,32.8,28.4,56.4c-4.7,23.6-25,40.1-48,41.1c-6.801,0.3-13.4,4.5-14.7,11.1l-4.2,21 c-1.3,6.7,3.1,13.1,9.3,16c20.8,9.8,33.101,32.8,28.4,56.4c-4.7,23.6-25,40.1-48,41.1c-6.8,0.3-13.4,4.5-14.7,11.1l-4.2,21 c-1.3,6.7,3.101,13.1,9.3,16c20.801,9.8,33.101,32.8,28.4,56.4c-4.7,23.601-25,40.101-48,41.101c-6.8,0.3-13.4,4.5-14.7,11.1 l-4.2,21C-0.935,476.7,3.464,483,9.665,485.9z M676.165,229.6c2.7-13.5,15.9-22.3,29.4-19.6s22.3,15.9,19.6,29.4l-33,164.2 l-20.3,101.2c-2.4,11.9-12.8,20.101-24.5,20.101c-1.601,0-3.3-0.2-4.9-0.5c-13.5-2.7-22.3-15.9-19.6-29.4l22.7-112.9L676.165,229.6 z M225.365,139.1c2.7-13.5,15.9-22.3,29.4-19.6s22.3,15.9,19.6,29.4l-11.4,56.7l-12.899,64.3l-10.4,51.8l-18.5,92.6 c-2.399,11.9-12.8,20.101-24.5,20.101c-1.6,0-3.3-0.2-4.899-0.5c-0.7-0.101-1.4-0.301-2-0.5c-12.4-3.601-20.101-16.101-17.5-28.9 l3.699-18.7l9.7-48.4L225.365,139.1z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="stat-value text-left">
              {project?.tickets.length}
            </div>
            <div className="stat-desc text-left text-s_black font-bold">
              Total Tickets
            </div>
          </div>
        </div>

        <div className="stats shadow rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
          <div className="stat">
            <div className="stat-title mb-5">
              <svg
                className="w-8"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#db766f"
                stroke-width="0.00024000000000000003"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                  <rect
                    x="-2.4"
                    y="-2.4"
                    width="28.80"
                    height="28.80"
                    rx="2.88"
                    fill="#db766f"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.9999 8.34406C21.0033 8.09432 20.8823 7.84296 20.636 7.69851L13.1419 3.3036C12.4534 2.89983 11.6007 2.89873 10.9111 3.30073L3.36936 7.69754C3.12194 7.84178 3.0004 8.09373 3.00383 8.34406H2.99998V15.7741H3.00408C3.01084 16.0181 3.13643 16.2591 3.38002 16.3958L10.9431 20.638C11.6164 21.0156 12.4378 21.0146 13.11 20.6353L20.6254 16.3949C20.8679 16.258 20.9929 16.0175 20.9997 15.7741L20.9999 8.34406ZM4.76446 8.90766C4.58408 8.80589 4.35536 8.86961 4.25359 9.04998C4.15181 9.23036 4.21553 9.45909 4.39591 9.56086L10.7548 13.1487C11.5471 13.5957 12.516 13.5934 13.3061 13.1425L19.5841 9.55996C19.764 9.45731 19.8266 9.22828 19.7239 9.0484C19.6213 8.86852 19.3922 8.80591 19.2123 8.90856L12.9343 12.4911C12.3735 12.8112 11.6858 12.8128 11.1234 12.4955L4.76446 8.90766Z"
                    fill="#FFF"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="stat-value text-left">{project?.closedTickets}</div>
            <div className="stat-desc text-left text-s_black font-bold">
              Closed Tickets
            </div>
          </div>
        </div>

        <div className="stats shadow rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
          <div className="stat">
            <div className="stat-title mb-5">
              <svg
                className="w-8"
                fill="#FFF"
                viewBox="-153.6 -153.6 819.20 819.20"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#FFF"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                  <rect
                    x="-153.6"
                    y="-153.6"
                    width="819.20"
                    height="819.20"
                    rx="81.92"
                    fill="#70db7d"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M490.18,181.4l-44.13-44.13a20,20,0,0,0-27-1,30.81,30.81,0,0,1-41.68-1.6h0A30.81,30.81,0,0,1,375.77,93a20,20,0,0,0-1-27L330.6,21.82a19.91,19.91,0,0,0-28.13,0L232.12,92.16a39.87,39.87,0,0,0-9.57,15.5,7.71,7.71,0,0,1-4.83,4.83,39.78,39.78,0,0,0-15.5,9.58L21.82,302.47a19.91,19.91,0,0,0,0,28.13L66,374.73a20,20,0,0,0,27,1,30.69,30.69,0,0,1,43.28,43.28,20,20,0,0,0,1,27l44.13,44.13a19.91,19.91,0,0,0,28.13,0l180.4-180.4a39.82,39.82,0,0,0,9.58-15.49,7.69,7.69,0,0,1,4.84-4.84,39.84,39.84,0,0,0,15.49-9.57l70.34-70.35A19.91,19.91,0,0,0,490.18,181.4ZM261.81,151.75a16,16,0,0,1-22.63,0l-11.51-11.51a16,16,0,0,1,22.63-22.62l11.51,11.5A16,16,0,0,1,261.81,151.75Zm44,44a16,16,0,0,1-22.62,0l-11-11a16,16,0,1,1,22.63-22.63l11,11A16,16,0,0,1,305.83,195.78Zm44,44a16,16,0,0,1-22.63,0l-11-11a16,16,0,0,1,22.63-22.62l11,11A16,16,0,0,1,349.86,239.8Zm44.43,44.54a16,16,0,0,1-22.63,0l-11.44-11.5a16,16,0,1,1,22.68-22.57l11.45,11.49A16,16,0,0,1,394.29,284.34Z"></path>
                </g>
              </svg>
            </div>
            <div className="stat-value text-left">{project?.openTickets}</div>
            <div className="stat-desc text-left text-s_black font-bold">
              Open Tickets
            </div>
          </div>
        </div>

        <div className="stats shadow rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
          <div className="stat">
            <div className="stat-value text-left text-s_black">
              {Math.round(
                (project?.closedTickets / project?.tickets.length) * 100
              )}{" "}
              %
            </div>
            <div className="stat-desc text-left text-s_black font-bold">
              Progress
            </div>
            <div className="stat-desc text-left">
              <progress
                className="progress progress-success"
                value={project?.closedTickets}
                max={project?.tickets.length}
              ></progress>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center bg-[#FFF] mt-5 p-2 rounded border-2">
        <div className="flex">
          <button
            className="btn btn-sm bg-[#0366d6] text-[#FFF] border-none"
            onClick={() => document.getElementById("addTicket").showModal()}
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
            New Ticket
          </button>
          <dialog id="addTicket" className="modal">
            <div className="modal-box flex flex-col justify-center items-center rounded-xl bg-[#FFF] border-2 ">
              <h2 className="text-left w-full text-s_black font-bold">
                Add new Ticket
              </h2>
              <label className="form-control w-full flex flex-col mb-5">
                <div className="label">
                  <span className="label-text text-s_black">Ticket Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={newTicketName}
                  className="input input-bordered w-full mb-5 input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
                  onChange={(e) => setNewTicketName(e.target.value)}
                />
                <div className="flex flex-row justify-around items-center">
                  <div>
                    <div className="join bg-[#FFF]">
                      <button
                        className={
                          "btn join-item bg-[#FFF] text-[#0366d6] w-20 border-2 border-gray-300 hover:bg-[#e2edfb] hover:border-gray-300 hover:scale-105 " +
                          (SelectedLabel == "feature" &&
                            "scale-105 bg-[#e2edfb]")
                        }
                        onClick={(e) => setSelectedLabel("feature")}
                      >
                        Feature
                      </button>
                      <button
                        className={
                          "btn join-item bg-[#FFF] text-[#de9a52] border-2 border-gray-300 w-20 hover:bg-[#faf3eb] hover:border-gray-300 hover:scale-105 " +
                          (SelectedLabel == "bug" && "scale-105 bg-[#faf3eb]")
                        }
                        onClick={(e) => setSelectedLabel("bug")}
                      >
                        Bug
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      "flex flex-row items-center p-2 rounded-lg border-2 transition-all duration-500 " +
                      (SelectedCritical && "bg-[#fee8e7] scale-105")
                    }
                  >
                    <input
                      value="Critical"
                      type="checkbox"
                      className={
                        "toggle toggle-sm z-0 toggle-error [--tglbg:#fff] mr-2"
                      }
                      checked={SelectedCritical}
                      onChange={(e) => setSelectedCritical(!SelectedCritical)}
                    />
                    <p className="text-[#d35a51] text-base font-bold mr-1">
                      Critical
                    </p>
                  </div>
                </div>
              </label>
              <div className="flex">
                <form method="dialog" className="mr-5">
                  <button
                    id="cancelBtn"
                    className="btn w-20 bg-[#d6dade] text-gray-600 border-gray-300 border-2 hover:scale-105 hover:bg-[#d6dade]"
                  >
                    Cancel
                  </button>
                </form>

                <button
                  className="btn w-20 bg-[#0366d6] text-[#FFF] border-gray-300 border-2 hover:scale-105 hover:bg-[#0366d6]"
                  onClick={addTicket}
                >
                  Add
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button id="closeNewTicketForm">close</button>
            </form>
          </dialog>
        </div>

        <div className="w-[30%]">
          <label className="form-control ghost">
            <input
              type="text"
              placeholder="Project name..."
              className="input input-bordered input-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
              onChange={handleSearch}
            />
          </label>
        </div>

        <div className="flex flex-row justify-center items-center">
          <button
            className={
              activeLabel || criticalLabel || activeStatus != "all"
                ? "btn btn-xs btn-circle mr-2 bg-[#fff]"
                : "hidden"
            }
            onClick={clearFilters}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                fill="#FFF"
              />
            </svg>
          </button>
          <div
            className={
              "flex flex-row justify-center items-center mr-10 rounded-2xl h-fit " +
              (activeLabel == "feature" && criticalLabel == "critical"
                ? " bg-[#e2edfb] cursor-pointer transition-all duration-500"
                : "border-none")
            }
          >
            <div
              className={
                activeLabel == "bug" && criticalLabel == "critical"
                  ? "badge badge-lg mr-3 bg-[#FFF] border-2 border-gray-200 text-gray-400 btn-disabled"
                  : "badge badge-lg bg-[#FFF] text-[#0366d6] border-[#0366d6] font-bold mr-3 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-[#e2edfb] " +
                    (activeLabel === "feature" &&
                      " bg-[#e2edfb] border-2 scale-105")
              }
              onClick={(e) => handleLabelFilter("feature")}
            >
              Features
            </div>

            <div
              className={
                "flex flex-row justify-center rounded-2xl " +
                (activeLabel == "bug" && criticalLabel == "critical"
                  ? " bg-[#f5d1ab] cursor-pointer transition-all duration-500"
                  : "border-none")
              }
            >
              <div
                className={
                  activeLabel === "feature" && criticalLabel === "critical"
                    ? "badge badge-lg bg-[#FFF] border-2 border-gray-200 text-gray-400 btn-disabled mr-3 transition-all duration-500 scale-0"
                    : "badge badge-lg bg-[#FFF] text-[#de9a52] border-[#de9a52] font-bold badge-neutral mr-3 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-[#faf3eb] " +
                      (activeLabel === "bug" &&
                        "bg-[#faf3eb] border-2 scale-110 ") +
                      (activeLabel === "bug" &&
                        criticalLabel === "critical" &&
                        " scale-100 ")
                }
                onClick={() => handleLabelFilter("bug")}
              >
                Bugs
              </div>

              <div
                className={
                  (activeLabel == "Bug" || activeLabel == "feature") &&
                  criticalLabel == "critical"
                    ? "badge badge-lg bg-transparent text-[#d35a51] border-none font-bold badge-neutral cursor-pointer transition-color duration-500 -translate-x-2"
                    : "badge badge-lg bg-[#FFF] text-[#d35a51] border-[#d35a51] font-bold cursor-pointer hover:scale-105 hover:bg-[#fee8e7] " +
                      (criticalLabel === "critical" &&
                        " bg-[#fee8e7] scale-105")
                }
                onClick={() => handleCriticalFilter("critical")}
              >
                Critical
              </div>
            </div>
          </div>

          <div className="mr-5 flex flex-row items-center">
            <div role="tablist" className="tabs tabs-boxed bg-[#FFF] border-2 ">
              <a
                role="tab"
                className={`tab ${
                  activeStatus === "open"
                    ? "bg-green-400 border-2 text-s_black font-bold mr-2 scale-110"
                    : "text-green-400 border-2 hover:border-green-400 mr-2 scale-90"
                } transition-color duration-300`}
                onClick={(e) => handleIsOpenFilter("open")}
              >
                Opened
              </a>
              <a
                role="tab"
                className={`tab ${
                  activeStatus === "all"
                    ? " text-s_black font-bold mr-2 scale-150"
                    : "text-s_black mr-2"
                } transition-color duration-500`}
                onClick={() => handleIsOpenFilter("all")}
              >
                All
              </a>
              <a
                role="tab"
                className={`tab ${
                  activeStatus === "closed"
                    ? "bg-red-400 border-2 text-s_black font-bold scale-110"
                    : "text-red-400 border-2 hover:border-red-400 scale-90"
                } transition-color duration-500`}
                onClick={() => handleIsOpenFilter("closed")}
              >
                Closed
              </a>
            </div>

            {/* <div className="mr-5 flex flex-row items-center">
            <div role="tablist" className="tabs tabs-boxed bg-[#FFF] border-2 ">
              <a
                role="tab"
                className={
                  "tab " +
                  (activeStatus == "open" &&
                    "bg-green-400 text-s_black font-bold")
                }
                onClick={(e) => handleFilter("open")}
              >
                Opened
              </a>
              <a
                role="tab"
                className={
                  "tab " +
                  (activeStatus == "all" &&
                    "bg-[#a1a879] text-s_black font-bold")
                }
                onClick={() => handleFilter("all")}
              >
                All
              </a>
              <a
                role="tab"
                className={
                  "tab " +
                  (activeStatus == "closed" &&
                    "bg-red-400 text-s_black font-bold")
                }
                onClick={() => handleFilter("closed")}
              >
                Closed
              </a>
            </div> */}

            {/* <div className="badge badge-lg badge-primary bg-[#D3D3D3] mr-2 hover:bg-[#26323e] hover:text-[#ADD8E6] cursor-pointer">
              Open
            </div>
            <div className="badge badge-lg badge-primary bg-red-300 hover:bg-[#26323e] hover:text-[#ADD8E6] cursor-pointer">
              Closed
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start mt-2 bg-[#FFF] rounded border-2 px-3 py-3 w-full">
        <div>
          <label className="form-control">
            <select
              className="select select-bordered select-ghost text-[#4e565e] placeholder:text-[#4e565e] bg-[#f6f8fa] border-2 border-[#dee3e8] focus:bg-transparent focus:outline-[#0366d6] focus:text-[#4e565e]"
              defaultValue={"createdAt"}
              onChange={handleSort}
            >
              <option value={"createdAt"}>Most Recent</option>
              <option value={"priority"}>priority</option>
            </select>
          </label>
        </div>
        {!isLoading && (
          <div className="w-full">
            <div className="overflow-x-auto ">
              <table className="table">
                {/* head */}
                <thead className="">
                  <tr className="text-xs text-gray-400 border-gray-200">
                    <th>#</th>
                    <th>Ticket title</th>
                    <th>Ticket desc</th>
                    <th>Label</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created at</th>
                  </tr>
                </thead>
                <tbody className="">
                  {/* row 1 */}
                  {filteredTickets?.map((ticket, index) => (
                    <tr
                      className={
                        "text-base text-s_black border-gray-200 hover:bg-[#f6f8fa] cursor-pointer " +
                        (ticket.isOpened ? "" : "bg-gray-50")
                      }
                      // onClick={openProject}
                    >
                      <th>{index + 1}</th>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.label}</td>
                      <td>
                        {ticket.priority ? (
                          <div className="flex flex-row items-center">
                            <svg
                              className="w-4 mr-1"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                fill="#8B0000"
                                cx="11.998"
                                cy="11.998"
                                fill-rule="nonzero"
                                r="9.998"
                              />
                            </svg>
                            Critical
                          </div>
                        ) : (
                          "False"
                        )}
                      </td>
                      <td>{ticket.status}</td>
                      <td>
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "2-digit", year: "numeric" }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
