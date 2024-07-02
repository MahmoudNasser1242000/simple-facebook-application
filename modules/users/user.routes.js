import { Router } from "express";
import { getSpecificUserWithSpecificPost, logout, signin, signup } from "./user.controller.js";
import { checkPost, checkUser } from "../../middlewares/index.js";

const userRouter = Router();

userRouter.get("/:userId/:postId", checkUser, checkPost, getSpecificUserWithSpecificPost);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.delete("/logout/:id", checkUser, logout);

export default userRouter