import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../utilities/client";
import { categories } from "../../utilities/data";
import Spinner from "../Spinner/Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const checkImageType = (imageType) => {
    let isAllowedType = false;

    const allowedImageTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/svg",
      "image/tiff",
    ];

    for (let i = 0; i < allowedImageTypes.length; i++) {
      if (allowedImageTypes[i] === imageType) {
        isAllowedType = true;
        break;
      }
    }

    return isAllowedType;
  };

  const uploadImage = (e) => {
    if (!e.target.files[0]) return;

    const imageFile = e.target.files[0];
    const { type, name } = e.target.files[0];

    const isAllowedImageType = checkImageType(type);

    if (isAllowedImageType) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", imageFile, {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Upload error", err);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="text-base lg:text-big flex flex-col justify-center items-center lg:h-4/5">
      {fields && (
        <p className="text-accentColor mb-5 transition-all duration-150 ease-in">
          Please fill in all the fields.
        </p>
      )}
      <div className="flex flex-col justify-center items-center p-3 lg:w-4/5 w-full">
        <div className="p-3 flex flex-0.7 w-full">
          <div className="bg-primaryColorDark relative flex justify-center items-center flex-col border-solid border-2 border-primaryColorLight hover:border-accentColor transition-all duration-200 ease-in-out p-3 w-full h-420">
            {loading && (
              <div className="absolute w-full h-full items-center justify-center top-0 right-0 bg-primaryColorDark">
                <Spinner />
              </div>
            )}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="text-textColor flex flex-col items-center justify-center w-full h-full ">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload fontSize={30} />
                    </p>
                    <p className="">Click to upload</p>
                  </div>
                  <p className="text-center mt-32">
                    Use high quality JPG, SVG, TIFF, PNG or GIF of size less
                    than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full flex items-center">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-file"
                  className="w-full h-auto lg:h-full lg:w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-2 hover:opacity-75 cursor-pointer outline-none transition-all duration-200 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <RiDeleteBin6Line fontSize={25} className="text-accentColor" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-3 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="bg-primaryColorDark outline-none text-base lg:text-big border-solid border-2 border-primaryColorLight focus:border-accentColor p-2"
          />
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About this pin"
            className="bg-primaryColorDark outline-none text-base lg:text-big border-solid border-2 border-primaryColorLight focus:border-accentColor p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="bg-primaryColorDark outline-none text-base lg:text-big border-solid border-2 border-primaryColorLight focus:border-accentColor p-2"
          />
          <div className="flex flex-col">
            <div className="category">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="w-full lg:w-auto bg-primaryColorDark category__select outline-none text-base lg:text-big capitalize border-solid border-2 border-primaryColorLight focus:border-accentColor px-2 py-1 cursor-pointer"
              >
                <option value="other" className="text-hoverColor">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-textColor category__option text-base outline-none capitalize"
                    value={category.name}
                    key={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-solid border-2 border-primaryColorLight hover:border-accentColor self-center p-1 mt-5 transition-all duration-200 ease-in-out">
              <button
                type="button"
                onClick={savePin}
                className="bg-primaryColorLight hover:bg-accentColor text-base lg:text-big px-4 py-1 outline-none transition-all duration-200 ease-in-out"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
