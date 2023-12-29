import React, { useEffect, useState } from "react";
import isMobile from "is-mobile";

import { fetchRepos } from "../services/RepoServices";
import Menu from "./dashboard/Menu";
import Overview from "./dashboard/pages/Overview";
import Project from "./dashboard/pages/Project";
import Profile from "./dashboard/pages/Profile";
import { isAuth } from "../services/OAuthServices";
import Confirmation from "./Reusables/Confirmation";
var path = window.location.href.split("/")[-1];

function Dashboard() {
  const [loading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeProject, setActiveProject] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getUrlPath = () => {
    var currentURL = window.location.href;

    var urlParts = currentURL.split("/");

    // if (urlParts[urlParts.length - 2] == "projects") return "projects";

    return urlParts;
  };

  const checkAuth = async () => {
    const auth = await isAuth();
    if (!auth) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const loadRepos = async () => {
    setIsLoading(true);
    const data = await fetchRepos();
    setRepos(data);
    // console.log(data);
    setIsLoading(false);
  };

  const init = async () => {
    await checkAuth();

    await loadRepos();
    const paths = getUrlPath();

    if (paths[paths.length - 2] == "projects") {
      setActiveTab(paths[paths.length - 2]);
      setActiveProject(paths[paths.length - 1]);
    } else {
      setActiveTab(paths[paths.length - 1]);
      setActiveProject("");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full justify-center items-center ">
        {isMobile() && (
          <Confirmation
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
          />
        )}
        {/* Menue */}
        <div className="flex flex-row justify-start w-fit h-full items-start border border-2">
          <Menu activeTab={activeTab} activeProject={activeProject} />
        </div>
        {/* Body */}
        <div className="body flex flex-col mx-auto w-[100%] h-full overflow-y-scroll bg-[#FFFFFF]">
          {activeTab == "dashboard" && <Overview />}
          {activeTab == "projects" && <Project projectId={activeProject} />}
          {activeTab == "profile" && <Profile />}
        </div>{" "}
      </div>
    </div>
  );
}

export default Dashboard;
