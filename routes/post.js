import express from "express";
import logger from "../middlewares/logger.js";
import {getPosts,getThisPost,updatePost,uploadPost,deletePost} from "../controllers/postController.js";
const router = express.Router();

//Get all posts
router.get('/',logger,getPosts)

//Get single post
router.get('/:id',logger,getThisPost)

//Post request
router.post('/',logger,uploadPost)

//Update Post
router.put('/:id',logger,updatePost)

//Delete Post
router.delete('/:id',logger,deletePost)

export default router;