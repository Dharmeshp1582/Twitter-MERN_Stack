import React from "react";
import { useSelector } from "react-redux";
import useGetLikedTweets from "../hooks/useGetLikedTweets";
import Tweet from "./Tweet";

const Favourites = () => {
  const { user } = useSelector((store) => store.user);
  const { tweets } = useSelector((store) => store.tweet);
  useGetLikedTweets(user?._id);

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <h2 className="text-xl font-bold m-4">Favourites</h2>
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
      ) : (
        <p className="m-4 text-gray-500">No liked tweets found.</p>
      )}
    </div>
  );
};

export default Favourites;
