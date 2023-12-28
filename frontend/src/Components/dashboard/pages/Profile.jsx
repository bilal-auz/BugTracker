import React, { useEffect, useState } from "react";
import { fetchUser, getUserSocialMedia } from "../../../services/userServices";
import { fetchPinnedRepos } from "../../../services/RepoServices";
import { hover } from "@testing-library/user-event/dist/hover";

function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [repos, setRepos] = useState([]);
  const [hovered, setHovered] = useState(false);

  const loadUserInfo = async () => {
    const userInfo = await fetchUser();
    const userSocialMedia = await getUserSocialMedia();

    userInfo.socialMedia = userSocialMedia;

    setUserInfo(userInfo);

    await loadPinnedRepos(userInfo?.login);
  };

  const loadPinnedRepos = async (username) => {
    const repos = await fetchPinnedRepos(username);
    console.log(repos);
    setRepos(repos);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <div className="h-full bg-[#f6f8fa]">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-col items-center w-1/3  ">
          <div className="flex flex-col items-center mr-10 ml-5">
            <img
              className="w-56 rounded-full"
              src={userInfo?.avatar_url}
              alt=""
            />
            <p className="text-3xl text-s_black font-bold">{userInfo?.name}</p>
            <div className="leading-none">
              <a
                className="text-lg text-gray-700 mr-2 leading-3"
                href={userInfo?.html_url}
              >
                @{userInfo?.login}
              </a>
              <div className="badge badge-primary badge-outline badge-sm uppercase font-semibold">
                {userInfo?.plan?.name}
              </div>
            </div>
            <p className="text-s_black text-lg mt-2">{userInfo?.bio}</p>
            <p className="text-sm font-semibold mt-2 text-s_black">
              {userInfo?.followers} Followers . {userInfo?.following} Followings
            </p>
            <div className="flex flex-row items-center h-full mt-3">
              {userInfo?.email && (
                <div className="flex flex-row">
                  <a
                    href={`mailto: ${userInfo?.email}`}
                    className="text-base text-s_black font-bold"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 mr-1"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></rect>{" "}
                      </g>
                    </svg>
                  </a>
                </div>
              )}

              {userInfo?.blog && (
                <div className="flex flex-row">
                  <a
                    className="text-base text-s_black font-bold"
                    href={userInfo?.blog}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 mr-2"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L12.5 6.06212"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                        <path
                          d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </a>
                </div>
              )}

              {userInfo?.socialMedia.filter(
                (social) => social.provider == "linkedin"
              ).length > 0 && (
                <div className="flex flex-row">
                  <a
                    href={
                      userInfo?.socialMedia.find(
                        (social) => social.provider === "linkedin"
                      ).url
                    }
                    className="text-s_black text-base"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 mr-1"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                        <path
                          d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                        <path
                          d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                          fill="#0F0F0F"
                        ></path>{" "}
                      </g>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center h-full w-full w-2/3 rounded-l-[100px] border-2 p-5 bg-[#FFF]">
          <div className="flex flex-col items-center w-full text-s_black p-7">
            <p className="text-left w-full font-bold text-lg">
              Pinned Repos{" "}
              <span className="text-xs text-[#00000070]">-top 4-</span>
            </p>
            <div className="flex flex-row justify-between items-stretch flex-wrap w-full">
              {repos.slice(0, 4).map((repo, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-between w-[49%] px-4 py-4 border-2 rounded-md transtransition-all duration-200 hover:scale-105 ${
                    index > 1 && "mt-4"
                  }`}
                >
                  <div>
                    <p className="text-left text-lg font-bold capitalize mb-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 inline mr-1"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235"
                            stroke="#000000"
                            stroke-width="1.5"
                          ></path>{" "}
                          <path
                            d="M8 7H16"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M8 10.5H13"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M13 16V19.5309C13 19.8065 13 19.9443 12.9051 20C12.8103 20.0557 12.6806 19.9941 12.4211 19.8708L11.1789 19.2808C11.0911 19.2391 11.0472 19.2182 11 19.2182C10.9528 19.2182 10.9089 19.2391 10.8211 19.2808L9.57889 19.8708C9.31943 19.9941 9.18971 20.0557 9.09485 20C9 19.9443 9 19.8065 9 19.5309V16.45"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      {repo?.name}
                    </p>
                    <p
                      className={`text-base text-left ${
                        !repo?.description && "italic text-[#00000096]"
                      }`}
                    >
                      {repo?.description || "No Descrption..."}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between w-full mt-5">
                    <p
                      className={`text-left text-base font-semibold ${
                        !repo?.primaryLanguage?.name &&
                        "italic text-[#00000096]"
                      }`}
                    >
                      <svg
                        className="w-3 mr-2 inline fill-current"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          color: repo?.primaryLanguage?.color || "#00000096",
                        }}
                      >
                        <circle
                          // fill="#8B0000"
                          cx="11.998"
                          cy="11.998"
                          fill-rule="nonzero"
                          r="9.998"
                        />
                      </svg>
                      {repo?.primaryLanguage?.name || "No Primary Language..."}
                    </p>
                    <a href={repo?.url} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col items-start mt-3 pl-7 pt-0 ">
            <p className="text-left w-full font-bold text-lg text-s_black">
              Last Year Contributions
            </p>
            <img
              className="w-[92%] border-2 rounded-md p-5 transtransition-all duration-200 hover:scale-105"
              src={`https://ghchart.rshah.org/${userInfo?.login}`}
              alt="Name Your Github chart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
