const mongoose = require('mongoose');

//------------------------------------------
//const mongoURL = process.env.MONGODB_URL_LOCAL;     //using variable from .env file
//const mongoURL = process.env.MONGODB_URL;           //using variable from .env file
const mongoURL = "mongodb://localhost:27017/hotels";

//------------------------------------------
mongoose.connect(mongoURL, {        //establish connection
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});         
const db = mongoose.connection;     //mongoose maintains default database object so that it will connect to its database

//========================================================================
//------------Defining event listeners
db.on('connected',()=>{
    console.log('connected to mongodb server');
})
db.on('error',(err)=>{
    console.log('Mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
})

//==========================================================================
//----------Exporting db 
module.exports = db;
