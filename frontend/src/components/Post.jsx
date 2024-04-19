import React from "react";
import profile from "../assets/student.webp";
import { Image } from "react-ionicons";
import { Podium } from "react-ionicons";
import Button from "./Button";

function Post() {
  return (
    <div className="flex flex-row  p-2 w-2/3">
      <img
        src={profile}
        alt="profile"
        className="w-16 h-16 rounded-full mx-2 "
      />
      <div className="flex flex-col w-full ">
        <input
          type="text"
          placeholder="what is  new today"
          className="py-2 px-2 mb-2 border border-gray-400 focus:outline-none rounded-md"
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row w-1/6 justify-evenly">
            <Image  height="32px" width="32px" color="#00ADB5" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer'/>
            <Podium   height="32px" width="32px" color="#00ADB5" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' />
          </div>
          <Button primary rounded outline>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
