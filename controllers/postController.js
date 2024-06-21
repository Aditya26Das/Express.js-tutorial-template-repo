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

//@desc GET all Posts
//@route GET /api/posts
export const getPosts = (req,res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0)
    {
        res.json(posts.slice(0,limit))
    }
    else
    {
        res.json(posts)
    }
}

//@desc GET a specific Post
//@route GET /api/posts/:id
export const getThisPost = (req,res,next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post=>post.id === id)
    if(!post)
    {
        const error = new Error(`Post of id : ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
        
    res.status(200).json(post)
}

//@desc DELETE a specific Post
//@route DELETE /api/posts/:id
export const deletePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    if(!posts.find(post => post.id === id))
    {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    }

    posts = posts.filter(post => post.id !== id)

    res.status(200).json(posts)
}

//@desc UPDATE a specific Post
//@route PUT /api/posts/:id
export const updatePost = (req,res)=>{
    const id = parseInt(req.params.id);

    posts.map((post) => {
        if(post.id === id)
        {
            post.name = req.body.name;
        }
    })

    res.status(200).json(posts)
}

//@desc UPLOAD a specific Post
//@route POST /api/posts/:id
export const uploadPost = (req,res,next) => {
    
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
}
