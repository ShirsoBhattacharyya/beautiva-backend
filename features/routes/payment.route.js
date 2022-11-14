const express = require("express")
const router=express.Router()
const Razorpay=require("razorpay")
const authmiddleware=require("../middlewares/authmiddleware")
require("dotenv").config()
router.post("/",authmiddleware,async(req,res)=>{
    const {amount}=req.body
    console.log(amount)
    try{
      var instance = new Razorpay({ key_id: `rzp_test_AXYx1ocjhVC5q5`, key_secret: `hc78Sb4MiNfsVDe8OlLRsJaK` })
    let order=await instance.orders.create({
      amount: amount*100,
      currency: "INR",
      receipt: "receipt#1",
    })
    return res.status(201).send({message:"Successful",order:order,amount:amount})
    }catch(e){
      return res.status(401).send({message:e.message})
    }
})
module.exports=router