const express = require('express');

const books = require('./data/books.json');

const app = express();

app.use(express.json());

const stamp = (req,res,next) => {
    req.body.name = "Shivam Pandey";
    next();
}

app.get("/books",stamp,(req,res) => {

    const api_requested_by = req.body.name;

    res.send( {api_requested_by ,books} );

})

app.get("/books/:id",stamp,(req,res) => {
    const book = books.filter((book) => req.params.id == book.id);

    const api_requested_by = req.body.name;

    res.send({api_requested_by, book: book[0]})
})

app.post("/books",(req, res) => {
    const newBooks = [...books, req.body]    
    
    res.send(newBooks);
})

app.patch("/books/:id",(req, res) => {

    const newBooks = books.map((book) => {
        
        if(req.params.id == book.id) {

            if(req.body.id != undefined) book.id = req.body.id;
            if(req.body.author_name != undefined) book.author_name = req.body.author_name;
            if(req.body.book_name != undefined) book.book_name = req.body.book_name;
            if(req.body.pages != undefined) book.pages = req.body.pages;
            if(req.body.published_year != undefined) book.published_year = req.body.published_year;
        }
        return book;
    })

    res.send(newBooks);

})

app.delete("/books/:id",(req,res) => {
    const newBooks = books.filter((book) => book.id != req.params.id)

    res.send(newBooks);
})


app.listen(2346,() => {

    console.log("Running on port 2346");
    
})