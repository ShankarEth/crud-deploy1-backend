const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoute = require('./controller/studentRoute');

mongoose.set('strictQuery',true);
mongoose.connect('mongodb+srv://test:12345@cluster0.x5oucj4.mongodb.net/schooldb');
var db= mongoose.connection;
db.on('error',()=>console.log("error occured"));
db.once("open",()=>console.log('Connected to database'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/student', studentRoute);

app.listen(5200,()=>console.log("Server started at 5200"));
