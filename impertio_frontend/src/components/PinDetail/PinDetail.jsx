import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiDownload } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../../utilities/client";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../utilities/data";
import Spinner from "../Spinner/Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinHovered, setPinHovered] = useState(false);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const pinHoveredStyle =
    "border-solid border-2 border-primaryColorLight opacity-25 grayscale";
  const pinNotHoveredStyle = "border-solid border-2 border-primaryColorLight";

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail)
    return (
      <div className="h-screen">
        <Spinner message="Loading the pin!" />
      </div>
    );

  return (
    <>
      <div className="text-base lg:text-big flex flex-col items-center">
        <div
          className="xl:w-1/2 relative flex flex-col justify-center items-center gap-5 overflow-hidden overflow-hidden transition-all duration-200 ease-in-out"
          onMouseEnter={() => setPinHovered(true)}
          onMouseLeave={() => setPinHovered(false)}
        >
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="pin"
            className={pinHovered ? pinHoveredStyle : pinNotHoveredStyle}
          />
          {pinHovered && (
            <a
              href={`${pinDetail.image.asset.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="absolute w-full h-full top-0 right-0 flex items-center justify-center z-10"
            >
              <BiDownload
                fontSize={48}
                className="text-emerald-400"
              />
            </a>
          )}
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div>
            <h1 className="text-hoverColor text-center sm:text-left text-secondary text-xl lg:text-2xl break-words mt-1">
              {pinDetail.title}
            </h1>
            <p className="text-textColor text-center sm:text-left mt-3 capitalize">{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail?.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center"
          >
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="capitalize text-secondary hover:underline">
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <div className="flex justify-center">
            <h2 className="text-xl mt-5 lg:text-2xl text-hoverColor text-secondary">
              Comments
            </h2>
          </div>
          <div className="max-h-370">
            {pinDetail?.comments?.map((comment, index) => (
              <div
                className="flex gap-2 mt-5 items-center break-all overflow-x-hidden overflow-y-auto hide-scrollbar"
                key={index}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="text-secondary">{comment.postedBy.userName}</p>
                  <p className="break-all">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center xl:justify-start mt-6 gap-3">
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
              <img
                src={pinDetail.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </Link>
            <input
              type="text"
              className="bg-primaryColorDark flex outline-none border-solid border-2 border-primaryColorLight focus:border-accentColor p-2 w-4/5 "
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="mt-5 lg:mt-0 p-1 border-solid border-2 border-primaryColorLight hover:border-accentColor transition-all duration-200 ease-in-out">
              <button
                type="button"
                className="bg-primaryColorLight hover:bg-accentColor transition-all duration-200 ease-in-out px-5 py-1 outline-none"
                onClick={addComment}
              >
                {addingComment ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <div className="flex items-center justify-center">
            <h2 className="text-secondary text-center text-hoverColor text-xl mt-5 lg:text-2xl my-6">
              Discover more
            </h2>
          </div>
          <MasonryLayout pins={pins}></MasonryLayout>
        </>
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
