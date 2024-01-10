const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/userRoutes');


mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser:true,
    userUnifiedTopology:true
});
const db = mongoose.connection;
db.on('error',
    console.error(error)
)
db.once('open',()=>{
    console.log("connect to db");
})


app.use(bodyParser.json());
app.use('/api',userRoutes)

app.listen(port,()=>{
    console.log("server is up on 3000")
})


