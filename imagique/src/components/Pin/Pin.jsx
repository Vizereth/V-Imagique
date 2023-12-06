import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../../utilities/client";
import { BiDownload } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { LuMousePointerClick } from "react-icons/lu";
import { fetchUser } from "../../utilities/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const postHoveredStyle = "w-full opacity-25 grayscale";
  const postNotHoveredStyle = "w-full opacity-100";

  const navigate = useNavigate();

  const user = fetchUser();
  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4,
            userId: user?.sub,
            postedBy: { _type: "postedBy", _ref: user?.sub },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="select-none text-big lg:text-big my-5 mx-2 lg:m-2">
      <div
        className="relative border-solid border-2 border-primaryColorLight relative cursor-pointer w-auto overflow-hidden transition-all duration-200 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onDoubleClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className={postHovered ? postHoveredStyle : postNotHoveredStyle}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base"
              data-tooltip-id="pin-tooltip"
              data-tooltip-content="Double Click to see pin details"
            >
              <LuMousePointerClick className="text-2xl opacity-90"/>
              <Tooltip id="pin-tooltip" />
            </p>
            <div className="flex items-center justify-between">
              <div>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="text-emerald-400 p-1 flex items-center justify-center opacity-100 hover:opacity-75 hover:shadow-md outline-none transition-all duration-200 ease-in-out"
                >
                  <BiDownload fontSize={30} />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="text-secondary px-2 outline-none transition-all duration-200 ease-in-out"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="text-secondary hover:text-hoverColor px-2 outline-none transition-all duration-200 ease-in-out"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary hover:text-hoverColor flex items-center gap-2 pb-1 px-2 hover:shadow-md transition-all duration-200 ease-in-out"
                >
                  <BsFillArrowUpRightCircleFill />
                  Source
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type="button"
                  className="hover:opacity-75 p-2 outline-none transition-all duration-200 ease-in-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <RiDeleteBin6Line
                    fontSize={30}
                    className="text-accentColor"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 mb-4 items-center"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="text-small lg:text-base capitalize text-secondary hover:underline">
          {postedBy?.userName}
        </p>
      </Link>
    </div>
  );
};

export default Pin;
