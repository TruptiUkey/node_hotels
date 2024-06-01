const express = require('express');
const router = express.Router();

//===============================================================
//-----------Importing model
const person = require('./../models/person');

//===============================================================

//-----------Creating Endpoints

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('Data Saved Successfully!');
        res.status(200).send(response);
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