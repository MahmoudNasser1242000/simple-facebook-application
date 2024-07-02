import express from "express"
import { testConnection } from "./database/dbConnection.js";
import userRouter from "./modules/users/user.routes.js";
import postRouter from "./modules/posts/post.routes.js";
import commentRouter from "./modules/comments/comment.routes.js";

// create server
const app = express();
app.use(express.json());

// text db connection
testConnection();

//Routes
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

// handle 404 page
app.get('*', (req, res) => {
    res.status(404).json({error: '404 page not found'});
})

app.listen(3000, () => {
    console.info(`Server listen on port 3000`);
})