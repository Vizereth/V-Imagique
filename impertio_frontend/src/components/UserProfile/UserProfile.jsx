import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utilities/data";
import { client } from "../../utilities/client";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner/Spinner";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBnt] = useState("created");
  const [bannerHovered, setBannerHovered] = useState(false);
  const [randomImageLink, setRandomImageLink] = useState("");
  const [randomImageDownloadLink, setRandomImageDownloadLink] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();

  const activeBtnStyle =
    "border-solid border-b-2 border-hoverColor px-4 py-1 outline-none text-hoverColor transition-all duration-200 ease-in-out";
  const notActiveBtnStyle =
    "border-solid border-b-2 border-zinc-400 px-4 py-1 outline-none hover:opacity-75 transition-all duration-200 ease-in-out";

  const bannerHoveredStyle =
    "w-full h-370 2xl:h-510 shadow-lg object-cover opacity-25 grayscale";
  const bannerNotHoveredStyle = "w-full h-370 2xl:h-510 shadow-lg object-cover";

  const handleSignOut = () => {
    /* global google */
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    navigate("/login");
  };

  const getRandomImage = () => {
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setRandomImageLink(data?.urls?.regular);
        setRandomImageDownloadLink(data?.links?.html);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });

    getRandomImage();
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center text-base lg:text-big">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col items-center mb-1 p-5">
          <div
            onMouseEnter={() => setBannerHovered(true)}
            onMouseLeave={() => setBannerHovered(false)}
            className="relative mt-7 flex flex-col justify-center items-center border-solid border-2 border-primaryColorLight relative cursor-pointer w-auto overflow-hidden transition-all duration-200 ease-in-out"
          >
            <img
              src={randomImageLink}
              alt="banner"
              className={
                bannerHovered ? bannerHoveredStyle : bannerNotHoveredStyle
              }
            />
            {bannerHovered && (
              <a
                href={randomImageDownloadLink}
                target="_blank"
                rel="noreferrer"
                className="absolute w-full h-full top-0 right-0 flex items-center justify-center z-10"
              >
                <BiDownload
                  fontSize={40}
                  className="text-emerald-400"
                />
              </a>
            )}
          </div>
          <div className="flex flex-col items-center">
            <img
              src={user.image}
              alt="user"
              className="rounded-full w-12 h-12 z-10 -mt-6 shadow-xl object-cover"
            />
            <h1 className="text-secondary text-big lg:text-xl text-center mt-3">
              {user.userName}
            </h1>
          </div>
          <div className="cursor-pointer my-5 p-1 border-solid border-2 border-primaryColorLight hover:border-accentColor transition-all duration-200 ease-in-out">
            <div
              className="bg-primaryColorLight hover:bg-accentColor py-2 px-4 flex items-center justify-center gap-3 transition-all duration-200 ease-in-out"
              onClick={(e) => handleSignOut(e)}
            >
              <button type="button">
                <AiOutlineLogout fontSize={30} />
              </button>
              <p>Logout</p>
            </div>
          </div>
          <div className="flex gap-5 text-center my-5">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBnt("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyle : notActiveBtnStyle
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBnt("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyle : notActiveBtnStyle
              }`}
            >
              Saved
            </button>
          </div>
        </div>
        {pins?.length ? (
          <div className="px-2 ">
            <MasonryLayout pins={pins} />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full mt-2">
            {`No pins here :(`}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
