import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className="w-[100%]">
      <div className="my-4">
        <div className="flex items-center justify-evenly border-b border-gray-300">
          <div className="cursor-pointer hover:text-gray-200 w-full text-center px-4 py-3 ">
            <h1 className="text-lg font-semibold text-gray-500">For you</h1>
          </div>
          <div className="cursor-pointer hover:text-gray-200 w-full text-center px-4 py-3 ">
            <h1 className="text-lg font-semibold text-gray-500">Following</h1>
          </div>
        </div>
        <div className=" border-b border-gray-100">
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
                size="60"
                round={true}
              />
            </div>
            <input
              type="text"
              placeholder="What is happening?"
              className="w-full outline-none border-none text-xl"
            />
          </div>
          <div className="flex items-center justify-between  border-b border-gray-300 p-4">
            <div className="text-xl mx-5">
              <CiImageOn />
            </div>
            <button className="bg-blue-400 text-white px-2 py-1 text-lg text-right rounded-full border-none cursor-pointer hover:bg-gray-400">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
