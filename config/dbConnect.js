const mongoose=require("mongoose")
require("dotenv").config()

const dbConnect=()=>{
    return mongoose.connect('mongodb+srv://beautiva:beautiva@beautiva-ecommerce.k9gresz.mongodb.net/beautiva-ecom')
    // return mongoose.connect(`mongodb://127.0.0.1:27017/beautiva-ecommerce`)
}
module.exports=dbConnect;