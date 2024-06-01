const express = require('express');
const router = express.Router();

//========================================
//--------Importing Model
const menuItem = require('./../models/menuItem');

//========================================

//--------Creating Endpoints

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newItem = new menuItem(data);
        const response = await newItem.save();
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
        const response = await menuItem.find();
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

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType = req.params.workType;
        if(tasteType =='chef' || tasteType == 'manager' || tasteType=='waiter'){
            const response = await person.find({taste:tasteType});
            console.log('Data find Successfully!');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid tasteType'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//=============================================
//---------exporting router
module.exports = router;