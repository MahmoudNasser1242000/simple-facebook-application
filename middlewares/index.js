import commentModel from "../database/models/comment.js";
import postModel from "../database/models/posts.js";
import userModel from "../database/models/users.js";

export const checkUser = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.params;
    const {UserId} = req.body
    try {
        const data = await userModel.findByPk(id || UserId || userId);
        if (!data) {
            res.status(400).json({ error: "Cant't find user with this id" })
        } else {
            next()
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const checkComment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await commentModel.findByPk(id);
        if (!data) {
            res.status(400).json({ error: "Cant't find comment with this id" })
        } else {
            req.commentUser = data.UserId;
            req.commentPost = data.PostId;
            next()
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const checkPost = async (req, res, next) => {
    const { id } = req.params;
    const { postId } = req.params;
    const {PostId} = req.body
    try {
        const data = await postModel.findByPk(id || PostId || req.commentPost || postId);
        if (!data) {
            res.status(400).json({ error: "Cant't find post with this id" })
        } else {
            req.postUser = data.UserId;
            next()
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const checkPostUser = async (req, res, next) => {
    const { userId } = req.params;
    if (+userId !== req.postUser) {
        res.status(400).json({ error: "Only user can delete or update posts" })
    } else {
        next()
    }
}

export const checkCommentUserOnDelete = async (req, res, next) => {
    const { userId } = req.params;
    if (+userId !== req.commentUser && +userId !== req.postUser) {
        res.status(400).json({ error: "Only user can delete comments" })
    } else {
        next()
    }
}

export const checkCommentUserOnUpdate = async (req, res, next) => {
    const { userId } = req.params;
    if (+userId !== req.commentUser) {
        res.status(400).json({ error: "Only user can update comments" })
    } else {
        next()
    }
}