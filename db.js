const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';    //defining mongodb server
mongoose.connect(mongoURL);                             //establish connection
const db = mongoose.connection;     //mongoose maintains default database object so that it will connect to its database

db.on('connected',()=>{
    console.log('connected to mongodb server');
})
db.on('error',()=>{
    console.log('Mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
})

module.exports = db;
