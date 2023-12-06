import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <ThreeCircles
          height="100"
          width="100"
          color="#738994"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
        <p className="text-base lg:text-2xl text-center px-2">{message}</p>
      </div>
  );
};

export default Spinner;
