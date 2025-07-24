import React from "react";
import LeftSidebar from "./LeftSidebar";
// import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOtherUsers } from "../hooks/useOtherUsers";

const Home = () => {
  const { user, otherUsers, otherUsersLoading, otherUsersError } = useSelector(
    (store) => store.user
  );

  // Call the hook directly, not inside useEffect
  useOtherUsers(user?._id);

  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      {/* <Feed /> */}
      <Outlet />
      <RightSidebar
        otherUsers={otherUsers}
        loading={otherUsersLoading}
        error={otherUsersError}
      />
    </div>
  );
};

export default Home;
