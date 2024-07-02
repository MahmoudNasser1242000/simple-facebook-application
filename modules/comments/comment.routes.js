import { Router } from "express";
import { addComment, deleteComment, getAllComments, updateComment } from "./comment.controller.js";
import { checkComment, checkCommentUserOnDelete, checkCommentUserOnUpdate, checkPost, checkUser } from "../../middlewares/index.js";

const commentRouter = Router();

commentRouter.get("/", getAllComments);
commentRouter.post("/", checkUser, checkPost, addComment);
commentRouter.delete("/:id/:userId", checkComment, checkPost, checkCommentUserOnDelete, deleteComment);
commentRouter.patch("/:id/:userId", checkComment, checkCommentUserOnUpdate, updateComment);

export default commentRouter