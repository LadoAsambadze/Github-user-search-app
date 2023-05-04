import { useState, useEffect, useRef } from "react";
import moon from "../public/assets/icon-moon.svg";
import sun from "../public/assets/icon-sun.svg";
import loop from "../public/assets/icon-search.svg";
import location from "../public/assets/icon-location.svg";
import website from "../public/assets/icon-website.svg";
import twitter from "../public/assets/icon-twitter.svg";
import company from "../public/assets/icon-company.svg";
import axios from "axios";

function App() {
  const [active, setActive] = useState(true);
  const [search, setSearch] = useState("ladoasambadze");
  const [data, setData] = useState("ladoasambadze");
  const [error, setError] = useState("");
  const submitBtnRef = useRef(null);

  const restApiDateString = data.created_at;
  const dateObj = new Date(restApiDateString);
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    submitBtnRef.current.click();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reset = "";
    setSearch(reset);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${search}`
      );
      const info = response.data;
      setData(info);
    } catch (error) {
      const noresult = "no result";
      setError(noresult);
    }
  };

  function changeTheme() {
    setActive(!active);
  }

  return (
    <>
      <div
        className="w-full h-full  pt-8 px-6 pb-20 transition  duration-700 md:pt-8 md:px-24 md:pb-60
        xl:pt-8 xl:px-[355px]  "
        style={{ backgroundColor: active ? "#F6F8FF" : "#141D2F" }}
      >
        <div className="flex flex-row w-full justify-between items-center">
          <h1
            className="font-bold text-2xl leading-10 text-[#222731] font-mono"
            style={{ color: active ? "#222731" : "#FFFFFF" }}
          >
            devfinder
          </h1>
          <div className="flex flex-row items-center">
            <span
              className="text-xs leading-5 font-bold tracking-[2.5px] text-[#4B6A9B] uppercase font-mono"
              style={{ color: active ? "#4B6A9B" : "white" }}
            >
              {active ? "Dark" : "Light"}
            </span>
            <img
              onClick={changeTheme}
              src={active ? moon : sun}
              className="w-5 h-5 m-4 cursor-pointer"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white py-2 pl-4 pr-2 rounded-2xl flex flex-row items-center justify-between font-mono shadow-xl w-full
          md:pl-8 md:py-3 md:pr-3"
          style={{ backgroundColor: active ? "white" : "#1E2A47" }}
        >
          <div className="flex flex-row w-full items-center">
            <img src={loop} className="w-4 h-4 md:w-6 md:h-6" />
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={`ml-4 font-mono text-xs leading-6 font-normal w-[80%] bg-[#1E2A47] text-[#4B6A9B] outline-none md:text-base ${
                active ? null : "custom"
              }`}
              style={{
                background: active ? "white" : "#1E2A47",
                color: active ? "#4B6A9B" : "white",
              }}
              placeholder="Search GitHub username…"
            />
            <p className="text-[8px] md:text-xs font-bold leading-1 xl:font-bold xl:text-base xl:leading-4 text-[#F74646] font-mono ">
              {error}
            </p>
          </div>

          <button
            type="submit"
            ref={submitBtnRef}
            className=" py-3 pl-5 pr-4 bg-[#0079FF] rounded-lg text-white font-bold text-xs leading-5 text-center cursor-pointer font-mono
            md:pl-6 md:pr-5 md:py-4 xl:pl-7 xl:pr-6"
          >
            Search
          </button>
        </form>

        {data ? (
          <div
            className="w-full flex flex-col bg-white px-6 pt-8 pb-12 mt-4 rounded-xl shadow-xl md:py-10 md:px-10 xl:pt-12 xl:px-12 overflow-hidden"
            style={{ backgroundColor: active ? "white" : "#1E2A47" }}
          >
            <div className="w-full flex flex-row">
              <img
                src={data.avatar_url}
                className="w-[70px] h-[70px] rounded-full md:w-[117px] md:h-[117px]"
              />
              <div className=" flex flex-col ml-5 xl:ml-9 xl:flex-row xl:justify-between">
                <div className="flex flex-col">
                  <span
                    className="text-base leading-6 text-[#2B3442] font-bold font-mono md:text-3xl md:leading-10"
                    style={{ color: active ? "#2B3442" : "white" }}
                  >
                    {data.name}
                  </span>
                  <span className="font-normald text-[#0079FF] text-xs leading-5 font-mono cursor-pointer md:text-base md:leading-6">
                    @{data.login}
                  </span>
                </div>
                <span
                  className="font-normald text-[#697C9A] text-xs leading-5 font-mono
                  md:text-base md:leading-6  xl:ml-36"
                  style={{ color: active ? "#697C9A" : "white" }}
                >
                  Joined {formattedDate}
                </span>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row w-full">
              <div className="hidden xl:block xl:w-[120px] xl:h-full"> </div>
              <div className="xl:ml-12 w-full">
                <p
                  className="text-xs leading-6 font-normal text-[#4B6A9B] mt-8 font-mono  md:text-base xl:mt-0 "
                  style={{ color: active ? "#4B6A9B" : "white" }}
                >
                  {data.bio ? data.bio : "No bio"}
                </p>
                <div
                  className="w-full flex flex-row justify-evenly items-center bg-[#F6F8FF] rounded-lg mt-6 py-4 px-3 md:py-4 md:pl-8 md:pr-24   "
                  style={{ backgroundColor: active ? "#F6F8FF" : "#141D2F" }}
                >
                  <div className="flex flex-col ">
                    <span
                      className="text-xs leading-4 text-center text-[#4B6A9B] font-normal font-mono md:leading-5"
                      style={{ color: active ? "#4B6A9B" : "white" }}
                    >
                      Repos
                    </span>
                    <span
                      className="text-base leading-6 text-center uppercase text-[#2B3442] mt-2 font-bold font-mono md:text-2xl md:leading-8"
                      style={{ color: active ? "#2B3442" : "white" }}
                    >
                      {data.public_repos !== null &&
                      data.followers !== undefined
                        ? data.public_repos
                        : "9"}
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span
                      className="text-xs leading-4 text-center text-[#4B6A9B] font-normal font-mono md:leading-5"
                      style={{ color: active ? "#4B6A9B" : "white" }}
                    >
                      Followers
                    </span>
                    <span
                      className="text-base leadig-6 text-center uppercase text-[#2B3442] mt-2 font-bold font-mono md:text-2xl md:leading-8"
                      style={{ color: active ? "#2B3442" : "white" }}
                    >
                      {data.followers !== null && data.followers !== undefined
                        ? data.followers
                        : "3998"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-xs leading-4 text-center text-[#4B6A9B] font-normal font-mono md:leading-5"
                      style={{ color: active ? "#4B6A9B" : "white" }}
                    >
                      Following
                    </span>
                    <span
                      className="text-base leadig-6 text-center uppercase text-[#2B3442] mt-2 font-bold font-mono md:text-2xl md:leading-8"
                      style={{ color: active ? "#2B3442" : "white" }}
                    >
                      {data.following !== null && data.followers !== undefined
                        ? data.following
                        : "9"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 md:mt-7 flex flex-col md:flex-row md:items-center md:justify-between ">
              <div>
                <div className="flex flex-row  ">
                  <img src={location} className="w-4 h-5 cursor-pointer" />
                  <span
                    className="font-mono font-normal font-xs leading-5 text-[#4B6A9B] ml-5 cursor-pointer "
                    style={{
                      color: active ? "#4B6A9B" : "white",
                      opacity: data.location ? "" : "0.5",
                    }}
                  >
                    {data.location ? data.location : "not avaliable"}
                  </span>
                </div>
                <div className="flex flex-row mt-4 ">
                  <img src={website} className="w-4 h-5 cursor-pointer" />
                  <span
                    className="font-mono font-normal font-xs leading-5 text-[#4B6A9B] ml-5 cursor-pointer overflow-hidden"
                    style={{
                      color: active ? "#4B6A9B" : "white",
                      opacity: data.blog ? "" : "0.5",
                    }}
                  >
                    {data.blog ? data.blog : "not avaliable"}
                  </span>
                </div>
              </div>
              <div className="md:pr-16">
                <div className="flex flex-row mt-4 md:mt-0">
                  <img src={twitter} className="w-4 h-5 cursor-pointer " />
                  <span
                    className="font-mono font-normal font-xs leading-5 text-[#4B6A9B] ml-5 cursor-pointer "
                    style={{
                      color: active ? "#4B6A9B" : "white",
                      opacity: data.twitter_username ? "" : "0.5",
                    }}
                  >
                    {data.twitter_username
                      ? data.twitter_username
                      : "not avaliable"}
                  </span>
                </div>
                <div className="flex flex-row mt-4 ">
                  <img src={company} className="w-4 h-5 cursor-pointer " />
                  <span
                    className="font-mono font-normal font-xs leading-5  ml-5 cursor-pointer opacity-100 "
                    style={{
                      color: active ? "#4B6A9B" : "white",
                      opacity: data.company ? "1" : "0.5",
                    }}
                  >
                    {data.company ? data.company : "not avaliable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
