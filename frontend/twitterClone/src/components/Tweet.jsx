import React from "react";
import Avatar from "react-avatar";
import { CiBookmark, CiHeart, CiSquareMore } from "react-icons/ci";
import { FaRegComment} from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
// import tickmark from "../assets/tickmark.jpg";

const Tweet = () => {
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex  p-4">
          <Avatar
            src="https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
            size="60"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">Patel Dharmesh </h1>
              <p className="text-gray-500 text-sm ml-2">dharmesh123 .1m 
              </p>
              <IoMdMore size={20} className="cursor-pointer ml-65"/>
            </div>
           
            <div className="text-gray-500 text-sm ">
              <p>Hello Developers lets connect and grow together</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
              <div className="p-2  hover:bg-blue-200 rounded-full cursor-pointer">

                <FaRegComment size={20}/>{" "}
              </div>
                <p>1</p>
              </div>
              <div className="flex items-center">
              <div className="p-2  hover:bg-pink-200 rounded-full cursor-pointer">

                <CiHeart size={24}/>{" "}
              </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
              <div className="p-2  hover:bg-blue-200 rounded-full cursor-pointer">

                <CiBookmark size={24}/>{" "}
              </div>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
