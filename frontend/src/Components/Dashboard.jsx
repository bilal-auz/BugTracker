import React, { useEffect, useState } from "react";
import { fetchRepos } from "../services/RepoServices";

function Dashboard() {
  const [loading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    setIsLoading(true);
    const data = await fetchRepos();
    setRepos(data);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="text-red-500">
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Repos
        </option>
        {repos.map((repo) => (
          <option>{repo.name}</option>
        ))}
      </select>
      {/* {!loading && <p>{repos[0].name}</p>} */}
    </div>
  );
}

export default Dashboard;
