const mongoose = require('mongoose');

const Schema = mongoose.Schema

const galleryItemSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }
},
    { timestamps: true })

//Model set up
//GalleryDb (collection) based on galleryItemSchema
const GalleryItem = mongoose.model("GalleryDb", galleryItemSchema)

//Model export
module.exports = GalleryItem