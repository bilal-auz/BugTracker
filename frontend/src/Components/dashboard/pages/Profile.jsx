import React, { useState } from "react";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    username: "@bilal_auz",
    email: "email@mail.com",
    followers: 3,
    followings: 24,
    repos: 5,
    contributions: 10,
    Stars: 3,
  });
  return (
    <div className="h-full  bg-[#f6f8fa]">
      <div className="flex flex-col justify-between items-center h-full ">
        <div className="flex flex-row items-center h-1/3 ">
          <div className="mr-10 ">
            <img className="w-44 rounded-2xl" src="assets/ana/me.png" alt="" />
            <p className="text-lg text-gray-700">{userInfo.username}</p>
          </div>
          <div className="flex flex-col items-start justify-between">
            <div className="flex flex-col items-start">
              <p className="text-sm text-gray-400 font-semibold">Name</p>
              <p className="text-3xl text-s_black font-bold">{userInfo.name}</p>
            </div>
            <div className="flex flex-col items-start h-full mt-3">
              <p className="text-sm text-gray-400 font-semibold">Email</p>
              <p className="text-3xl text-s_black font-bold">
                {userInfo.email}
              </p>
            </div>
            <p className="text-sm font-semibold mt-3 text-s_black">
              {userInfo.followers} Followers . {userInfo.followings} Followings
            </p>
          </div>
        </div>

        <div className="flex flex-col h-2/3 w-full rounded-t-[100px] border-2 p-5 bg-[#FFF]">
          <div className="flex flex-row justify-around w-full mt-8 ">
            <div className="stats shadow p-0 rounded-md w-1/5 bg-[#FFF] border-2 text-s_black">
              <div className="stat flex gap-x-2 flex-row items-center p-2 pb-3">
                <div className="stat-title m-0">
                  <svg
                    className="w-11"
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
                  <div className="stat-value text-left text-lg font-semibold">
                    Repositories
                  </div>
                  <div className="stat-desc text-left leading-5 text-s_black text-2xl font-extrabold">
                    {userInfo.repos}
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
                    {userInfo.contributions}
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
                    {userInfo.Stars}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-10">
            <img
              className="w-[85%] border-2 rounded-md p-5 "
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
