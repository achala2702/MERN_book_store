import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//route for save a new book
router.post('/', async (req, res)=>{
    try{
        //check if user sends all the fields
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message: "send all the required fileds(title, author, publish year)"});
        }

        //create and send the newly created book
        const newBook ={
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);

        return res.status(200).send(book);

    }catch(error){
        console.log(error.message);
        res.status(401).send({message: error.message})
    }
});

//route for get all books from db
router.get('/', async (req, res)=> {
    try{

        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    }catch(error){
        console.log(error.message);
        res.status(401).send({message: error.message})
    }
});

//route get a book from db
router.get('/:id', async (req, res)=> {
    try{
        //exracting the id from the request
        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);

    }catch(error){
        console.log(error.message);
        res.status(401).send({message: error.message})
    }
});

//route for update a book
router.put('/:id', async (req, res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message: "send all the required fileds(title, author, publish year)"});
        }
        //exracting the id from the req
        const {id} = req.params;

        //update the request body of the specific book
        const result = await Book.findByIdAndUpdate(id, req.body)

        //return a message if book not found
        if(!result){
            return res.status(404).send({message: "book not found"})
        }

        //send a message when book updated succesfully
        return res.status(200).send({message:"book update sucessfully"})

    //catching the errors
    }catch(error){
        console.log(error.message)
        res.status(401).send({message: error.message})
    }
})

//deleting a book from database
router.delete('/:id', async (req, res)=>{
    try{

        //extracting the id form the req
        const {id} = req.params;

        //delete the book with the id
        const result = await Book.findByIdAndDelete(id);

        //sending error if the specific book not available
        if(!result){
            return res.status(404).send({message: "book not found"})
        }

        //sending a message when book deletes successfully
        return res.status(200).send({message: "book delete succesfully"})

    }catch(error){
        console.log(error.message)
        res.status(401).send({message: error.message})
    }
})

export default router;