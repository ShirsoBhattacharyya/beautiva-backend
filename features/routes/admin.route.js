const express = require("express");
const ProductModel = require("../models/product.model");
const router=express.Router();
const UserModel = require("../models/user.model")

//admin-login
router.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user && user.role==='Admin'){
            return res.status(200).send('Login Successful');
        }else if(user && user.role!=='Admin'){
            return res.status(401).send('This is not an Admin account.');
        }       
    } catch (error) {
        return res.status(401).send({response:'Invalid user',message:error.message});       
    }
})
//admin-get all users
router.get('/users/all',async(req,res)=>{
    try {
        const allUsers=await UserModel.find({role:'Customer'});
        return res.send({message:success,data:allUsers});    
    } catch (e) {
        return res.status(401).send({response:'Invalid user',message:e.message});       
    }
})
//delete an user
router.delete('/user/:id',async(req,res)=>{
    try{
        let {id}=req.params;
        await UserModel.findByIdAndRemove({id});
        return res.send({message:success,response:'User account has been deleted'});
    }catch(e){
        return res.status(401).send({message:e.message});       
    }
})
//admin-get all products
router.get("/products/all",async(req,res)=>{
    try{
        const allProducts=await ProductModel.find()
        return res.send({message:success,data:allProducts})
    }catch(e){
        return res.status(401).send({message:e.message})
    }
})
//delete an user
router.delete('/products/:id',async(req,res)=>{
    try{
        let {id}=req.params;
        await ProductModel.findByIdAndRemove({id});
        return res.send({message:success,response:'Product has been removed'});
    }catch(e){
        return res.status(401).send({message:e.message});       
    }
})
module.exports=router;