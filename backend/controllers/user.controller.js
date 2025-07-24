import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Tweet } from "../models/tweet.model.js";


export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    // console.log("user created:-", user);

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user,
    });
    console.log(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("user logged in:-", user);
    return res
      .status(201)
      .cookie("token", token, {
        expiresIn: "7d",
        httpOnly: true,
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//Bookmarks

export const bookmarkTweet = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const tweetId = req.params.id;
    // Check if tweet exists
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found", success: false });
    }
    const user = await User.findById(loggedInUser);
    let updatedUser;
    if (user.bookmarks.includes(tweetId)) {
      //remove bookmark
      updatedUser = await User.findByIdAndUpdate(
        loggedInUser,
        { $pull: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Removed from bookmarks successfully",
        success: true,
        user: updatedUser,
      });
    } else {
      //add bookmark
      updatedUser = await User.findByIdAndUpdate(
        loggedInUser,
        { $push: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Tweet bookmarked successfully",
        success: true,
        user: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//get My profile

export const getMyProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select(
      "-password -followers -following -bookmarks"
    );
    console.log("user profile:-", user);
    return res.status(200).json({ message: "My profile", success: true, user });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUser = await User.find({ _id: { $ne: id } }).select(
      "-password -followers -following -bookmarks"
    );
    if (!otherUser) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Other users", success: true, otherUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//follow and unfollow
export const follow = async(req,res)=>{
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);//patel
      const user = await User.findById(userId);//keshav
      if(!user.followers.includes(loggedInUserId)){
          await user.updateOne({$push:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$push:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User already followed to ${user.name}`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} just follow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}

//unfollow
export const unfollow = async (req,res) => {
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);//patel
      const user = await User.findById(userId);//keshav
      if(loggedInUser.following.includes(userId)){
          await user.updateOne({$pull:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$pull:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User has not followed yet`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} unfollow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}