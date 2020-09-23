const express = require("express")
const app = express()
const PORT = process.env.PORT || 3030;
const mongoose = require('mongoose');
const GalleryItem = require("./models/galleryItem")

//connect with cluster
const dbUri = "mongodb+srv://supercode:supercode@cluster0.2kvja.mongodb.net/superDatabase?retryWrites=true&w=majority"

//mongo client construction
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db")
        app.listen(PORT, () => {
            console.log("server listening at http://localhost:3030")
        }) //first connect to db, second server listening
    })
    .catch(err => console.log(err))

app.use(express.static('public'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    // res.send("Hello World")
    GalleryItem.find()
        .then(result => {
            res.render("index", { gallery: result })
        })
})
app.get("/single", (resq, res) => {
    GalleryItem.findById("5f69c78d29d7dc6283bcb9c7")
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

//add document
app.get("/new", (req, res) => {
    const newGalleryItem = new GalleryItem({
        url: "https://images.unsplash.com/photo-1600121665593-209fa5f1f93c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        author: "George Howden",
        rating: 8
    })
    //save in database
    newGalleryItem.save()
        .then((result) => {
            // res.status(201).send(result)
            res.redirect("/")
        })
        .catch(err => console.log(err))
})

app.use((req, res) => {
    res.status(404).render("404")
})