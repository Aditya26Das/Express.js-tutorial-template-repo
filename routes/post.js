import express from "express";
import logger from "../middlewares/logger.js";
const router = express.Router();

let posts = [
    {
        id : 1,
        name : "Adi"
    },
    {
        id : 2,
        name : "Anji"
    },
    {
        id : 3,
        name : "Ayush"
    },
    {
        id : 4,
        name : "Anshuman"
    }
]


//Get all posts
router.get('/',logger,(req,res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0)
    {
        res.json(posts.slice(0,limit))
    }
    else
    {
        res.json(posts)
    }
})

//Get single post
router.get('/:id',logger,(req,res,next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post=>post.id === id)
    if(!post)
    {
        const error = new Error(`Post of id : ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
        
    res.status(200).json(post)
})

//Post request
router.post('/',logger,(req,res,next) => {
    
    const newPost = {
        id : posts.length+1,
        name : req.body.name
    }

    if(!newPost.name){
        const error = new Error("Please include a name.");
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
})

//Update Post
router.put('/:id',logger,(req,res)=>{
    const id = parseInt(req.params.id);

    posts.map((post) => {
        if(post.id === id)
        {
            post.name = req.body.name;
        }
    })

    res.status(200).json(posts)
})

//Delete Post
router.delete('/:id',logger,(req,res,next)=>{
    const id = parseInt(req.params.id);
    if(!posts.find(post => post.id === id))
    {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    }

    posts = posts.filter(post => post.id !== id)

    res.status(200).json(posts)
})

export default router;