import express from "express";
import { bookmarkTweet, follow , getMyProfile, getOtherUsers, login, logout, register, unfollow } from "../controllers/user.controller.js";

import isAuthenticated from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.put("/bookmark/:id",isAuthenticated, bookmarkTweet)
userRouter.get("/profile/:id",isAuthenticated, getMyProfile)
userRouter.get("/otheruser/:id",isAuthenticated, getOtherUsers)
userRouter.put("/follow/:id",isAuthenticated, follow)
userRouter.put("/unfollow/:id",isAuthenticated, unfollow)

export default userRouter;