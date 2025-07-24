import React from "react";
import CreatePost from "../components/CreatePost.jsx";
import Tweet from "../components/Tweet.jsx";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  useGetMyTweets(user?._id);
  console.log("tweets:=", tweets);
  return (
    <div className="w-[50%] border border-gray-200">
      <div>
        <CreatePost />
        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
