import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/Constants.jsx";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/Constants";
import { IoMdMore } from "react-icons/io";
import { useState, useRef } from "react";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tweet?.description || "");
  const menuRef = useRef(null);

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  const updateTweetHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/update/${id}`,
        { description: editText },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.log(error);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="40"
            round={true}
          />
          <div className=" ml-2 w-full">
            <div className="flex items-center relative">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${
                tweet?.userDetails[0]?.username
              } . ${timeSince(tweet?.createdAt)}`}</p>
              {user?._id === tweet?.userId && (
                <div className="ml-auto relative">
                  <IoMdMore
                    className="cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowMenu(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="flex flex-col gap-2 my-2">
                  <textarea
                    className="w-full border rounded p-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded"
                      onClick={() => updateTweetHandler(tweet._id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-1 bg-gray-300 rounded"
                      onClick={() => {
                        setIsEditing(false);
                        setEditText(tweet?.description || "");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{tweet?.description}</p>
              )}
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size="20px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
                >
                  <CiHeart size="24px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
