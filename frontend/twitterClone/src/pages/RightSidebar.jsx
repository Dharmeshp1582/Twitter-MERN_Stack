import React from "react";
import Avatar from "react-avatar";
import { FaSearch } from "react-icons/fa";

const RightSidebar = () => {
  return (
    <div className="w-[25%] my-4">
      <div className="p-2 bg-gray-100 rounded-full outline-none flex items-center justify-between w-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full "
        />
        <FaSearch size={20} className="cursor-pointer text-gray-500" />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="text-lg font-bold mb-4">Who to follow</h1>
        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
                size="40"
                round={true}
              />
            </div>
            <div className="ml-2">
              <h1 className="font-bold">Patel Dharmesh</h1>
              <p className="text-gray-500 text-sm">dharmesh123 .1m</p>
            </div>
          </div>

          <div>
            <button className="bg-black text-white px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
                size="40"
                round={true}
              />
            </div>
            <div className="ml-2">
              <h1 className="font-bold">Patel Dharmesh</h1>
              <p className="text-gray-500 text-sm">dharmesh123 .1m</p>
            </div>
          </div>

          <div>
            <button className="bg-black text-white px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/004/477/337/original/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg"
                size="40"
                round={true}
              />
            </div>
            <div className="ml-2">
              <h1 className="font-bold">Patel Dharmesh</h1>
              <p className="text-gray-500 text-sm">dharmesh123 .1m</p>
            </div>
          </div>

          <div>
            <button className="bg-black text-white px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RightSidebar;
