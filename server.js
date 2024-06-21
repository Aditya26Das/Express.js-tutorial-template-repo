import express from "express";
import { configDotenv } from "dotenv";
import errorHandler from "./middlewares/error.js";
import router from "./routes/post.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import path from "path";
import { fileURLToPath } from "url";

//Get the Directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


const port = process.env.PORT || 8000;
const app = express();
configDotenv("./.env");

//Setup a Static Folder
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/posts',router)
app.use(logger)
app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`Listening on the port : ${port}`)
})