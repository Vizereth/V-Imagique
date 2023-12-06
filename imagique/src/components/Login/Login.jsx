import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";
import { client } from "../../utilities/client";

const Login = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(userObject));

    console.log(userObject);

    const { name, sub, picture } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementsByClassName("google-btn-real")[0],
      { theme: "dark", size: "large" }
    );
  }, []);

  return (
    <div className="bg-primaryColorDark md:bg-01 bg-no-repeat bg-center bg-cover flex justify-center items-center h-screen">
      <div className="h-full flex flex-col justify-center gap-10 md:justify-between md:gap-0 items-center">
        <h1 className="text-title text-6xl text-hoverColor mt-75 sm:text-8xl">Impertio</h1>
        <div className="mb-100">
          <div className="p-1 relative flex cursor-pointer border-solid border-2 border-primaryColorLight hover:opacity-75 transition 200 duration-200 ease-in-out">
            <div className="google-btn-real absolute top-0 right-0 w-full h-full opacity-0 z-10"></div>
            <div className="px-2 py-1 bg-primaryColorLight flex items-center justify-center">
              <FcGoogle className="w-8 h-8" />
              <p className="flex items-center justify-center p-2">
                Sign in with google
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
