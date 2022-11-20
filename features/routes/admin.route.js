const express = require("express");
const ProductModel = require("../models/product.model");
const crypto = require("crypto-js");
const router=express.Router();
const UserModel = require("../models/user.model");
const OrderModel = require("../models/order.model");

//admin-login
router.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email,role:'Admin'});
        let db_password= crypto.AES.decrypt(user.password, `${process.env.PASSWORD_SECRET}`).toString(crypto.enc.Utf8);
        if(user && password===db_password){
            return res.status(200).send('Login Successful');
        }else if(user && password!==db_password){
            return res.status(401).send('Incorrect Password');
        }else{
            return res.status(401).send({response:'Unauthorized user'});
        }       
    } catch (error) {
        return res.status(401).send({response:'Unauthorized user',message:error.message});       
    }
})
//admin-get all users
router.get('/users/all',async(req,res)=>{
    try {
        const allUsers=await UserModel.find({role:'Customer'});
        return res.send({message:'success',data:allUsers});    
    } catch (e) {
        return res.status(401).send({response:'Invalid user',message:e.message});       
    }
})
//admin-add an user
router.post('/users/all',async(req,res)=>{
    const {firstName,lastName,userName,password,email,avatar}=req.body;
    const user=await UserModel.findOne({email:email});
    try{
        if(user){
            return res.status(401).send('Account already exists');
        }
        const hashed_password=crypto.AES.encrypt(password,process.env.PASSWORD_SECRET).toString();
        const newUser=await UserModel.create({firstName,lastName,userName,password:hashed_password,email,avatar});
        return res.send({message:'Account has been created',newUser});
    }catch(e){
        return res.status(401).send('Account is not created');
    }
})
//admin-delete an user
router.delete('/users/:id',async(req,res)=>{
    try{
        let {id}=req.params;
        await UserModel.findByIdAndRemove({_id:id});
        return res.send({response:'User account has been deleted'});
    }catch(e){
        return res.status(401).send({message:e.message});       
    }
})
//admin-get all products
router.get("/products/all",async(req,res)=>{
    try{
        const allProducts=await ProductModel.find()
        return res.send({message:'success',data:allProducts})
    }catch(e){
        return res.status(401).send({message:e.message})
    }
})
//admin-add a product
router.post("/products/all",async(req,res)=>{
    const {image1,title,description,category,brand,price,quan}=req.body
    console.log(req.body);
    try{
        const newProduct=await ProductModel.create({image1,title,description,category,brand,price,quan});
        return res.send({message:'success',newProduct});
    }catch(e){
        return res.status(401).send({response:'Product is not added',message:e.message});
    }
})
//admin-delete a product
router.delete('/products/:id',async(req,res)=>{
    try{
        let {id}=req.params;
        await ProductModel.findByIdAndRemove({_id:id});
        return res.send({response:'Product has been removed'});
    }catch(e){
        return res.status(401).send({message:e.message});       
    }
})
//admin-get all orders
router.get('/orders/all',async(req,res)=>{
    try {
        const allOrders=await OrderModel.find();
        return res.send({message:'success',data:allOrders});    
    } catch (e) {
        return res.status(401).send({response:'Invalid request',message:e.message});       
    }
})
//admin-delete an order
router.delete('/orders/:id',async(req,res)=>{
    try{
        let {id}=req.params;
        await OrderModel.findByIdAndRemove({_id:id});
        return res.send({response:'Order has been cancelled'});
    }catch(e){
        return res.status(401).send({message:e.message});       
    }
})
module.exports=router;