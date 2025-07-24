import React from "react";
import { IoHome } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { AiFillNotification } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/Constants";
import axios from "axios";
import { getUser } from "../redux/userSlice";
import { getOtherUsers } from "../redux/userSlice";
import { getMyProfile } from "../redux/userSlice";
import toast from "react-hot-toast";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[20%]">
      <div className="my-4">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.KgP6GNtgqBpwPQNuS_GGCAHaHa?pid=Api&P=0&h=180"
          alt="twitter logo"
          className="w-10 h-10 ml-4"
        />
      </div>
      <div className="my-4">
        <Link
          to="/"
          className="flex items-center gap-4  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full"
        >
          <div>
            <IoHome size="24px" />
          </div>
          <h1 className="font-bold">Home</h1>
        </Link>

        <div className="flex items-center gap-2  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full">
          <div>
            <CgMoreO size="24px" />
          </div>
          <h1 className="font-bold">Explore</h1>
        </div>

        <div className="flex items-center gap-2  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full">
          <div>
            <AiFillNotification size="24px" />
          </div>
          <h1 className="font-bold">Notifications</h1>
        </div>

        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center gap-4  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full"
        >
          <div>
            <CgProfile size="24px" />
          </div>
          <h1 className="font-bold">Profile</h1>
        </Link>

        <div className="flex items-center gap-2  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full">
          <div>
            <FaBookmark size="24px" />
          </div>
          <h1 className="font-bold">Bookmarks</h1>
        </div>

        <Link to="/favourites" className="flex items-center gap-2  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full">
          <div>
            <MdFavoriteBorder size="24px" />
          </div>
          <h1 className="font-bold">Favorites</h1>
        </Link>

      
        <div
          onClick={logoutHandler}
          className="flex items-center gap-2  my-2 hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-full"
        >
          <div>
            <IoLogOutOutline size="24px" />
          </div>
          <h1 className="font-bold">Logout</h1>
        </div>

        <button className="px-4 py-2 border-none text-lg text-md font-bold bg-blue-500 text-white rounded-full w-full mt-4 hover:bg-gray-400 cursor-pointer">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
