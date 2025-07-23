import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Avatar from "react-avatar"

const Profile = () => {
  return (
    <div className="w-[50%] border-l border-r border-gray-200 my-2">
      <div>
        <div className="flex items-center py-2">
          <Link className="p-2 rounded-full hover:bg-gray-100 cursor-pointer" >
            <IoMdArrowBack size={24}/>
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">Patel Dharmesh</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1566463268/1714619053/1080x360"
          alt="banner"
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
        <Avatar
                src="https://pbs.twimg.com/profile_images/1921908398569771008/9XaLKFVQ_400x400.jpg"
                size="120"
                round={true}
              />
        </div>

        <div className="text-right m-3">
          <button className="px-4 py-1 hover:bg-gray-200 cursor-pointer text-black border border-gray-500 rounded-full font-bold">Edit Profile</button>
        </div>
        <div className="mx-2 my-4">
          <h1 className="text-xl font-bold">Patel Dharmesh</h1>
          <h1>@dharmesh123</h1>   
        </div>
        <div className="m-4 text-sm">
          <p>Problem solver, coder by passion, 
          Mern stack developer, React developer, Nodejs developer, MongoDB developer, Express developer. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
