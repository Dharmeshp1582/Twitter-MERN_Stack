import React from "react";
import CreatePost from "../components/CreatePost";
import Tweet from "../components/Tweet";

const Feed = () => {
  return (
    <div className="w-[50%]  border-l border-r border-gray-200">
      <CreatePost />
      <Tweet />
      {/* <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/> */}
    </div>
  );
};

export default Feed;
