import Tweet from "../models/tweet.model.js";
import User from "../models/user.model.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    console.log(req.user);
    if (!description) {
      return res
        .status(400)
        .json({ message: "Description is required", success: false });
    }

    const tweet = await Tweet.create({ description, userId: req.user.id });
    console.log("tweet created:-", tweet);
    return res
      .status(201)
      .json({ message: "Tweet created successfully", success: true, tweet });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//delete tweet
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await Tweet.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Tweet deleted successfully", success: true, tweet });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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

//toggle likes or dislikes

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ message: "Tweet not found", success: false });
    }
    let updatedTweet;
    if (tweet.like.includes(loggedInUser)) {
      //dislike
      updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { like: loggedInUser } },
        { new: true }
      );
      return res.status(200).json({
        message: "Tweet disliked successfully",
        success: true,
        tweet: updatedTweet,
      });
    } else {
      //like
      updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { like: loggedInUser } },
        { new: true }
      );
      return res.status(200).json({
        message: "Tweet liked successfully",
        success: true,
        tweet: updatedTweet,
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


//get all tweets

export const getAllTweets = async (req,res) => {
  // loggedInUser ka tweet + following user tweet
  try {
      const id = req.params.id;
      const loggedInUser = await User.findById(id);
      const loggedInUserTweets = await Tweet.find({userId:id});
      const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
          return Tweet.find({userId:otherUsersId});
      }));
      return res.status(200).json({
          tweets:loggedInUserTweets.concat(...followingUserTweet),
      })
  } catch (error) {
      console.log(error);
  }
}

//get following tweets
export const getFollowingTweets = async (req,res) =>{
  try {
      const id = req.params.id;
      const loggedInUser = await User.findById(id); //loggedInUser is the user who is logged in
      const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
          return Tweet.find({userId:otherUsersId});
      }));
      return res.status(200).json({
          tweets:[].concat(...followingUserTweet)
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
