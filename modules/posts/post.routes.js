import { Router } from "express";
import { addPost, deletePost, getAllPosts, getSpecificPost, updatePost } from "./post.controller.js";
import { checkPost, checkPostUser, checkUser } from "../../middlewares/index.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getSpecificPost);
postRouter.post("/", checkUser, addPost);
postRouter.delete("/:id/:userId", checkPost, checkPostUser, deletePost);
postRouter.patch("/:id/:userId", checkPost, checkPostUser, updatePost);

export default postRouter