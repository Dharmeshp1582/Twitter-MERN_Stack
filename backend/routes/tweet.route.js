import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
  updateTweet,
  getLikedTweets,
} from "../controllers/tweet.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const tweetRouter = express.Router();

tweetRouter.post("/create", isAuthenticated, createTweet);
tweetRouter.delete("/delete/:id", isAuthenticated, deleteTweet);
tweetRouter.put("/update/:id", isAuthenticated, updateTweet);
tweetRouter.put("/like/:id", isAuthenticated, likeOrDislike);
tweetRouter.get("/alltweets/:id", isAuthenticated, getAllTweets);
tweetRouter.get("/followingtweets/:id", isAuthenticated, getFollowingTweets);
tweetRouter.get("/likedtweets/:id", isAuthenticated, getLikedTweets);

export default tweetRouter;
