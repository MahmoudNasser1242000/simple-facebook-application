import postModel from "../../database/models/posts.js"
import userModel from "../../database/models/users.js";

export const getAllPosts = async (req, res) => {
    try {
        const data = await postModel.findAndCountAll();
        res.status(200).json({data: {count: data.count, posts: data.rows}})
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const addPost = async (req, res) => {
    const {title, content, UserId} = req.body;
    try {
        const data = await postModel.create({
            title,
            content,
            UserId
        });
        res.status(201).json({msg: "Post created successfully", data})
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await postModel.destroy({
            where: {
                id,
            }
        });
        res.status(202).json({msg: "Post deleted successfully", data})
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    try {
        const data = await postModel.update(
            {title},
            {
            where: {
                id,
            }
        });
        res.status(202).json({msg: "Post updated successfully", data})
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getSpecificPost = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await postModel.findByPk(id, {
            include: {
                model: userModel
            }
        });

        if (data) {
            res.status(200).json({data})
        } else {
            res.status(400).json({msg: "Wrong post id"})
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}