//Server Configuration

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({ // Conecting to Mysql Data Base 
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUD'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extras:true}))


// HTTP Actions 

//GET
app.get('/api/get', (req,res)=>{
    const query = "SELECT * FROM BookStore"
    db.query(query, (err, result)=>{
        res.send(result)
    })
})

//POST
app.post('/api/insert', (req,res) => {

    const bookName = req.body.bookName
    const bookReview = req.body.bookReview

    const sql = "INSERT INTO BookStore ( BookName, BookReview) VALUES (?.?)"; 
    db.query( sql, [bookName, bookReview], (err, result) => {
        console.log(result)
    })
})

//DELETE
app.delete('/api/delete/:bookName', (req,res) => {
    const name = req.params.bookName
    
    const del = "DELETE FROM BookStore WHERE BookName= ?";
    db.query(del, name, (err, result) => {
        if(err) console.log(err);
    })
})

//UPDATE
app.put('/api/update', (req,res) => {
    const name = req.params.bookName
    const review = req.body.bookReview

    const update = "UPDATE BookStore SET BookReview = ? WHERE bookName = ?"; 
    db.query(update, [review, name], (err, result) =>{
        console.log(err)
    })
}) 

app.listen(3001, () => {
    console.log('running in port successfully')
})
