import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
  updateTweet,
} from "../controllers/tweet.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const tweetRouter = express.Router();

tweetRouter.post("/create", isAuthenticated, createTweet);
tweetRouter.delete("/delete/:id", isAuthenticated, deleteTweet);
tweetRouter.put("/update/:id", isAuthenticated, updateTweet);
tweetRouter.put("/like/:id", isAuthenticated, likeOrDislike);
tweetRouter.get("/all-tweets/:id", isAuthenticated, getAllTweets);
tweetRouter.get("/following-tweets/:id", isAuthenticated, getFollowingTweets);

export default tweetRouter;
