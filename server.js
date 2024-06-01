const express = require('express');
const app = express();

//=============================================================
//-------configuring .env file to identify it by server
require('dotenv').config();

//-----------Importing database
const db = require('./db');

//-----------Importing body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //.json can be replacable with the type of data sent by the client

//===============================================================
//-----------Importing schema
//const person = require('./models/person');

//-----------using variable from .env file
const PORT = process.env.PORT || 3000;

//===============================================================

//------------Importing routers

const personRoutes = require('./routes/personRoutes');  //importing with file-name
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');  //importing with file-name
app.use('/menu',menuRoutes);


//================================================================
//----------creating Endpoints
app.get('/',function(req,res){
    res.send('Welcome to my Restaurant');
})

//=================================================================
//-----------Listening Port
app.listen(PORT,()=>{
    console.log('You are connected to nodejs server with port 3000');
})