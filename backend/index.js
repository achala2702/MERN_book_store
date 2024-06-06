import express from "express";
import { PORT} from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middleware for parsing req body
app.use(express.json());

//middleware for handle cors policy
app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-type']
}));*/

//api for simple get req
app.get('/', (req, res)=>{
    console.log(req);
    return res.status(200).send("welcome")
})

//call the routes with requests
app.use('/books', bookRoutes);

//mongodb url from .env
const url = process.env.MONGODB_URL;
//connecting to the mongodb
mongoose.connect(url).then(()=>{
    console.log("app connected to the database");
    //runing the server if db connection successfull
    app.listen(PORT, ()=>{
        console.log(`listening on port: ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});