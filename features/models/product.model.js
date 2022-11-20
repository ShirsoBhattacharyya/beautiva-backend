const {Schema,model}=require('mongoose');

const ProductSchema=new Schema(
    {
        card_title:{type:String},
        title:{type:String,required:true},
        rating:{type:Number},
        reviews:{type:Number},
        price:{type:Number,required:true},
        off_price:{type:Number},
        offer:{type:Number},
        image1:{type:String,required:true},
        image2:{type:String},
        image3:{type:String},
        brand:{type:String,required:true},
        category:{type:String,required:true},
        sub_category:{type:String},
        description:{type:String,required:true},
        how_to_use:{type:String},
        quan:{type:Number,required:true},
    },{timestamps:true}
)

const ProductModel=model('product',ProductSchema);
module.exports=ProductModel;
