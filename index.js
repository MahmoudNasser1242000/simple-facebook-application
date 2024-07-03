import express from "express"
import cors from "cors"
import { testConnection } from "./database/dbConnection.js";
import userRouter from "./modules/users/user.routes.js";
import postRouter from "./modules/posts/post.routes.js";
import commentRouter from "./modules/comments/comment.routes.js";

// create server
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.port || 3000

// text db connection
testConnection();

//Routes
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Hello to our project'});
})

// handle 404 page
app.use('*', (req, res) => {
    res.status(404).json({error: '404 page not found'});
})

app.listen(port)