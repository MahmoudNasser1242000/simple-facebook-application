import commentModel from "../../database/models/comment.js"

export const getAllComments = async (req, res) => {
    try {
        const data = await commentModel.findAndCountAll();
        res.status(200).json({ data: { count: data.count, comments: data.rows } })
    } catch (error) {
        //res.status(400).json({ error })
    }
}

export const addComment = async (req, res) => {
    const { content, UserId, PostId } = req.body;
    try {
        const data = await commentModel.create({
            content,
            UserId,
            PostId
        });
        res.status(201).json({ msg: "Comment created successfully", data })
    } catch (error) {
        //res.status(400).json({ error })
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await commentModel.destroy({
            where: {
                id,
            }
        });
        res.status(201).json({ msg: "Comment deleted successfully", data })
    } catch (error) {
        //res.status(400).json({ error })
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const data = await commentModel.update(
            { content },
            {
                where: {
                    id,
                }
            });
        res.status(201).json({ msg: "Comment updated successfully", data })
    } catch (error) {
        //res.status(400).json({ error })
    }
}