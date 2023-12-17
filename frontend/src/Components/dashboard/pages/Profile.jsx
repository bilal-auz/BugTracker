import React, { useEffect, useState } from "react";
import { fetchUser, getUserSocialMedia } from "../../../services/userServices";
import { fetchPinnedRepos } from "../../../services/RepoServices";

function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [repos, setRepos] = useState([]);

  const loadUserInfo = async () => {
    const userInfo = await fetchUser();
    const userSocialMedia = await getUserSocialMedia();

    userInfo.socialMedia = userSocialMedia;

    setUserInfo(userInfo);
  };

  const loadPinnedRepos = async () => {
    const repos = await fetchPinnedRepos();
    console.log(repos);
    setRepos(repos);
  };

  useEffect(() => {
    loadUserInfo();
    loadPinnedRepos();
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
              <div className="badge badge-primary badge-outline badge-sm">
                PRO
              </div>
            </div>
            <p className="text-s_black text-lg mt-2">{userInfo?.bio}</p>
            <p className="text-sm font-semibold mt-2 text-s_black">
              {userInfo?.followers} Followers . {userInfo?.following} Followings
            </p>
            <div className="flex flex-row items-center h-full mt-3">
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
            <div className="flex flex-row justify-between w-full">
              <div
                className={`flex flex-col justify-between w-[49%] px-4 py-4 border-2 rounded-md transtransition-all duration-200 hover:border-[${repos[0]?.primaryLanguage.color}] hover:scale-105`}
              >
                <div>
                  <p className="text-left text-lg font-bold capitalize">
                    {repos[0]?.name}
                  </p>
                  <p className="text-base text-left">{repos[0]?.description}</p>
                </div>
                <div className="flex flex-row justify-between w-full mt-5">
                  <p className={`text-left text-base`}>
                    {repos[0]?.primaryLanguage.name}
                  </p>
                  <a href={repos[0]?.url}>
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
              <div
                className={`flex flex-col justify-between w-[49%] px-4 py-4 border-2 rounded-md transtransition-all duration-200 hover:border-[${repos[1]?.primaryLanguage.color}] hover:scale-105`}
              >
                <div>
                  <p className="text-left text-lg font-bold capitalize">
                    {repos[1]?.name}
                  </p>
                  <p className="text-base text-left">{repos[1]?.description}</p>
                </div>
                <div className="flex flex-row justify-between w-full mt-5">
                  <p className={`text-left text-base`}>
                    {repos[1]?.primaryLanguage.name}
                  </p>
                  <a href={repos[1]?.url}>
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
            </div>

            <div className="flex flex-row justify-between mt-4">
              <div
                className={`flex flex-col justify-between w-[49%] px-4 py-4 border-2 rounded-md transtransition-all duration-200 hover:border-[${repos[2]?.primaryLanguage.color}] hover:scale-105`}
              >
                <div>
                  <p className="text-left text-lg font-bold capitalize">
                    {repos[2]?.name}
                  </p>
                  <p className="text-base text-left">{repos[2]?.description}</p>
                </div>
                <div className="flex flex-row justify-between w-full mt-5">
                  <p className={`text-left text-base`}>
                    {repos[2]?.primaryLanguage.name}
                  </p>
                  <a href={repos[2]?.url}>
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

              <div
                className={`flex flex-col justify-between w-[49%] px-4 py-4 border-2 rounded-md transtransition-all duration-200 hover:border-[${repos[3]?.primaryLanguage.color}] hover:scale-105`}
              >
                <div>
                  <p className="text-left text-lg font-bold capitalize">
                    {repos[3]?.name}
                  </p>
                  <p className="text-base text-left">{repos[3]?.description}</p>
                </div>
                <div className="flex flex-row justify-between w-full mt-5">
                  <p className={`text-left text-base`}>
                    {repos[3]?.primaryLanguage.name}
                  </p>
                  <a href={repos[3]?.url}>
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
            </div>
          </div>
          {/* <div className="flex flex-row justify-around w-full ">
            <div className="stats shadow p-0 rounded-md bg-[#FFF] border-2 text-s_black">
              <div className="stat flex gap-x-2 flex-row items-center p-2 pb-3">
                <div className="stat-title m-0">
                  <svg
                    className="w-7"
                    viewBox="-4.8 -4.8 33.60 33.60"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFFFFF"
                    stroke="#FFFFFF"
                    stroke-width="0.00024000000000000003"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect
                        x="-4.8"
                        y="-4.8"
                        width="33.60"
                        height="33.60"
                        rx="4.368"
                        fill="#9694ff"
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
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                        <path
                          fill-rule="nonzero"
                          d="M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7zm0-2h6v-3H6.5a1.5 1.5 0 0 0 0 3H7v-2h6v2zm6-5V4H6v10.035A3.53 3.53 0 0 1 6.5 14H19zM7 5h2v2H7V5zm0 3h2v2H7V8zm0 3h2v2H7v-2z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="stat-value text-left text-base font-semibold">
                    Repositories
                  </div>
                  <div className="stat-desc text-left leading-5 text-s_black text-lg font-extrabold">
                    {userInfo?.public_repos + userInfo?.total_private_repos}
                  </div>
                </div>
              </div>
            </div>
            <div className="stats shadow p-0 rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
              <div className="stat flex gap-x-2 flex-row items-center p-2 pb-3">
                <div className="stat-title m-0">
                  <svg
                    className="w-11"
                    viewBox="-4.08 -4.08 32.16 32.16"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFF"
                    stroke="#FFF"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect
                        x="-4.08"
                        y="-4.08"
                        width="32.16"
                        height="32.16"
                        rx="4.1808"
                        fill="#62b8d5"
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
                      <title>git_compare_fill</title>{" "}
                      <g
                        id="页面-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        {" "}
                        <g
                          id="Development"
                          transform="translate(-576.000000, -48.000000)"
                          fill-rule="nonzero"
                        >
                          {" "}
                          <g
                            id="git_compare_fill"
                            transform="translate(576.000000, 48.000000)"
                          >
                            {" "}
                            <path
                              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                              id="MingCute"
                              fill-rule="nonzero"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M6,2.99994 C7.65685,2.99994 9,4.34308 9,5.99994 C9,7.240849 8.24658397,8.30578855 7.1722376,8.76227298 L7,8.82923 L7,15.9999 C7,16.51275 7.38604429,16.9354092 7.88337975,16.9931725 L8,16.9999 L10.207,16.9999 L9.79282,16.5857 C9.4023,16.1952 9.4023,15.562 9.79282,15.1715 C10.1532631,14.8110385 10.7205208,14.7833107 11.1127973,15.0883166 L11.207,15.1715 L13.3284,17.2928 C13.6888615,17.6533538 13.7165893,18.2205349 13.4115834,18.6127989 L13.3284,18.707 L11.207,20.8284 C10.8165,21.2189 10.1833,21.2189 9.79282,20.8284 C9.43234,20.4678462 9.40461077,19.9006651 9.70963231,19.5084011 L9.79282,19.4142 L10.207,18.9999 L8,18.9999 C6.40232321,18.9999 5.09633941,17.7510226 5.00509271,16.1761773 L5,15.9999 L5,8.82923 C3.83481,8.4174 3,7.30616 3,5.99994 C3,4.34308 4.34315,2.99994 6,2.99994 Z M12.7929,3.17156 C13.1834,2.78103 13.8166,2.78103 14.2071,3.17156 C14.5675615,3.53204 14.5952893,4.09926651 14.2902834,4.49156153 L14.2071,4.58577 L13.7929,4.99994 L16,4.99994 C17.597725,4.99994 18.903664,6.24885462 18.9949075,7.82366664 L19,7.99994 L19,15.1706 C20.1652,15.5825 21,16.6937 21,17.9999 C21,19.6568 19.6569,20.9999 18,20.9999 C16.3431,20.9999 15,19.6568 15,17.9999 C15,16.75901 15.753407,15.6941075 16.827761,15.2375667 L17,15.1706 L17,7.99994 C17,7.48709929 16.613973,7.06443214 16.1166239,7.00666766 L16,6.99994 L13.7929,6.99994 L14.2072,7.41415 C14.5977,7.80468 14.5977,8.43784 14.2072,8.82837 C13.8466462,9.18885 13.2794651,9.21657923 12.8871224,8.91155769 L12.7929,8.82837 L10.6716,6.70705 C10.3111385,6.34656077 10.2834107,5.77933355 10.5884166,5.38703848 L10.6716,5.29283 L12.7929,3.17156 Z"
                              id="形状"
                              fill="#FFF"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="stat-value text-left text-lg font-semibold">
                    Commits
                  </div>
                  <div className="stat-desc text-left leading-5 text-s_black text-2xl font-extrabold">
                    {userInfo?.contributions}
                  </div>
                </div>
              </div>
            </div>
            <div className="stats shadow p-0 rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
              <div className="stat flex gap-x-2 flex-row items-center p-2 pb-3">
                <div className="stat-title m-0">
                  <svg
                    className="w-11"
                    viewBox="-5.04 -5.04 34.08 34.08"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect
                        x="-5.04"
                        y="-5.04"
                        width="34.08"
                        height="34.08"
                        rx="4.4304"
                        fill="#e88787"
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
                        d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268 21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12 20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65 8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757 7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468 5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="stat-value text-left text-lg font-semibold">
                    Stars
                  </div>
                  <div className="stat-desc text-left leading-5 text-s_black text-2xl font-extrabold">
                    {userInfo?.Stars}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="w-full flex flex-col items-center mt-3 transtransition-all duration-200 hover:scale-105">
            <img
              className="w-[92%] border-2 rounded-md p-5 "
              src="https://ghchart.rshah.org/bilal-auz"
              alt="Name Your Github chart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
