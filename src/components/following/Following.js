/** @format */

import React from "react";
import Avatar from "../../assets/man.png";
export const Following = () => {
  return (
    <div className="flex justify-between sm:min-w-[300px] items-center gap-2 mb-2 ">
      <div className="flex flex-row items-center">
        <img className="h-[50px] px-5 cursor-pointer" src={Avatar} alt="" />
        <h2>Shreya</h2>
      </div>

      <div>
        <button className="border border-richblack-200 p-2 px-6 rounded-md text-blue-200 hover:active:bg-blue-200 hover:active:text-white">
          UnFollow
        </button>
      </div>
    </div>
  );
};
