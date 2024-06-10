const express = require('express');
const router = express.Router();

//===============================================================
//-----------Importing model
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//===============================================================

//-----------Creating Endpoints

router.post('/signup',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('Data Saved Successfully!');
        const payload = {
            id:response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Token is:=', token);
        res.status(200).json({response:response,token:token});
        if(!response){
            console.log('Empty data cannot be saved!');
            res.status(500).json({error:'Empty data cannot be saved'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.post('/login',async(req,res) => {
    try{
        //extract username and password from request body
        const {username,password} = req.body;

        //find the user by username
        const user = await person.findOne({username:username});

        //if username does not exist or password does not match return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }
        //generate Token
        const payload = {
            id:user.id,
            username:user.username
        }
        const token = generateToken(payload);
        //return token as response
        res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res) => {
    try{
        const userData = req.user;
        console.log("user Data:",userData);
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const response = await person.find();
        console.log('Data find Successfully!');
        res.status(200).json(response);
        if(!response){
            console.log('Data not found!');
            res.status(404).json({error:'data not found'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType =='chef' || workType == 'manager' || workType=='waiter'){
            const response = await person.find({work:workType});
            console.log('Data find Successfully!');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid worktype'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//===============================
//---------exporting router
module.exports = router;