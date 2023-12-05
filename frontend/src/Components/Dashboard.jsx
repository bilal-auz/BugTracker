import React, { useEffect, useState } from "react";
import { fetchRepos } from "../services/RepoServices";
import Menu from "./dashboard/Menu";
import Overview from "./dashboard/pages/Overview";
import Project from "./dashboard/pages/Project";
import Profile from "./dashboard/pages/Profile";
var path = window.location.href.split("/")[-1];

function Dashboard() {
  const [loading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const getUrlPath = () => {
    var currentURL = window.location.href;

    var urlParts = currentURL.split("/");

    return urlParts[urlParts.length - 1];
  };

  useEffect(() => {
    loadRepos();
    setActiveTab(getUrlPath());
  }, []);

  const loadRepos = async () => {
    setIsLoading(true);
    // const data = await fetchRepos();
    // setRepos(data);
    // console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden ">
      <div className="flex flex-row justify-center items-center ">
        {/* Menue */}
        <div className="flex flex-row justify-start w-fit h-screen items-start">
          <Menu />
        </div>

        {/* Body */}
        <div className="body flex flex-col mx-auto w-[100%] h-screen px-8 overflow-y-scroll bg-green-200">
          {activeTab == "overview" && <Overview />}
          {activeTab == "proj-name" && <Project />}
          {activeTab == "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
