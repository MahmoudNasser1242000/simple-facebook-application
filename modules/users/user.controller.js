import commentModel from "../../database/models/comment.js";
import postModel from "../../database/models/posts.js";
import userModel from "../../database/models/users.js"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, 8);
        const data = await userModel.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password: hashPassword
            },
        });
        if (data[1]) {
            res.status(201).json({msg: "Signin succcessfully", data: data[0]});
        } else {
            res.status(400).json({msg: "User allready exists"})
        }
    } catch (error) {
        //res.status(400).json({msg: "Can't resgister", error})
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const data = await userModel.findOne({
            where: { email },
        });

        if (data) {
            const compare = bcrypt.compareSync(password, data.password);
            if (compare) {
                res.status(201).json({msg: "Login successfully", data})
            } else {
                res.status(400).json({msg: "Email or password is wrong"})
            }
        } else {
            res.status(400).json({msg: "Cant't find user with this email"})
        }
    } catch (error) {
        //res.status(400).json({msg: "Can't signin", error})
    }
}

export const logout = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await userModel.destroy({
            where: {
                id,
            }
        });

        res.status(202).json({msg: "Logout successfully", data})
    } catch (error) {
        //res.status(400).json({msg: "Can't logout", error})
    }
}

export const getSpecificUserWithSpecificPost = async (req, res) => {
    const {userId, postId} = req.params
    try {
        const data = await userModel.findAndCountAll(
            {
                where: {
                id: userId
                },
                include: {
                    model: postModel,
                    where: {
                        id: postId
                    },
                    include: {
                        model: commentModel
                    }
                },
        },);
        
        if (data.rows.length) {
            res.status(200).json({ data: { count: data.count, users: data.rows } })
        } else {
            res.status(400).json({ msg: "post is not belong to this user" })
        }
    } catch (error) {
        //res.status(400).json({ error })
    }
}