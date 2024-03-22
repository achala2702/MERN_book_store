import mongoose from "mongoose";


const bookShema = mongoose.Schema(
    {
        title: {
            type: String,
            requried: true,

        },
        author: {
            type: String,
            requried: true,
        },
        publishYear: {
            type: Number,
            requried: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookShema);