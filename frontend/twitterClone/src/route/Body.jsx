import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Feed from "../pages/Feed";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Feed/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
       
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Body;
