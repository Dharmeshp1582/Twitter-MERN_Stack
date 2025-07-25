import { Tweet } from "../models/tweet.model.js";
import User from "../models/user.model.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }
    const user = await User.findById(id).select("-password");
    await Tweet.create({
      description,
      userId: id,
      userDetails: user,
    });
    return res.status(201).json({
      message: "Tweet created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      // dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User disliked your tweet.",
      });
    } else {
      // like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User liked your tweet.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllTweets = async (req, res) => {
  // loggedInUser ka tweet + following user tweet
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({ userId: id });
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

//update tweet
export const updateTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    console.log("tweet updated:-", tweet);
    return res
      .status(200)
      .json({ message: "Tweet updated successfully", success: true, tweet });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getLikedTweets = async (req, res) => {
  try {
    const id = req.params.id; // user id
    const likedTweets = await Tweet.find({ like: id });
    return res.status(200).json({
      tweets: likedTweets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch liked tweets.",
      success: false,
    });
  }
};
