const express = require('express');
const app = express();
const db = require('./db');     //Importing database
require('dotenv').config();    //configuring .env file to identify it by server

//const person = require('./../models/person');           //Importing person model
const personRoutes = require('./routes/personRoutes');  //importing personRoutes
const menuRoutes = require('./routes/menuRoutes');      //importing with file-name
const passport = require('./auth');                 //importing configured passport


//const passport = require('passport');                       //importing passport middleware for authentication
//const LocalStrategy = require('passport-local').Strategy;   //we will use this strategy for authentication => known as "username and password strategy"

const bodyParser = require('body-parser');      //Importing body-parser
app.use(bodyParser.json());                     //.json can be replacable with the type of data sent by the client
const PORT = process.env.PORT || 3000;          //using variable from .env file


//================================================================

// passport.use(new LocalStrategy(async (USERNAME, password, done) => {
//     //authentication logic is here.
//     try{
//         console.log('Received Credentials:',USERNAME, password);
//         const user = await person.findone({username:USERNAME});
//         if(!user)
//             return done(null, false,{message:'Incorrect username.'});
        
//         const isPasswordMatch = user.password === password ? true : false;
//         if(isPasswordMatch){
//             return done (null,user);
//         }else{
//             return done (null,false,{message:'Incorrect password'});
//         }
//     }
//     catch(err){
//         return done(err);
//     }
// }))

//===============================================================

const logRequest = (req,res,next) => {                                                  //Middleware Functions used for logging with next() callback function
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();                                                                             //middlewae function always call next() function that indicates you can move on to the next phase
}

app.use(logRequest);                                                                    //accessing logRequest from all endpoints
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});             //to authenticate defining localAuthMiddleware

//creating Endpoints
app.get('/',function(req,res){   //here in between endpoint and request function we can pass logRequst function
    res.send('Welcome to my Restaurant');
})

//===============================================================

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

//=================================================================
//-----------Listening Port

app.listen(PORT,()=>{
    console.log('You are connected to nodejs server with port 3000');
})