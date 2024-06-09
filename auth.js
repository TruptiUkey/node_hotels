const passport = require('passport');                       //importing passport middleware for authentication
const LocalStrategy = require('passport-local').Strategy;   //we will use this strategy for authentication => known as "username and password strategy"
const person = require('./models/person');               //Importing person model

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logic is here.
    try{
        // console.log('Received Credentials:',USERNAME, password);
        const user = await person.findOne({username:USERNAME});
        if(!user)
            return done(null, false,{message:'Incorrect username.'});
        
        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch){
            return done (null,user);
        }else{
            return done (null,false,{message:'Incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;  //export configured passport
