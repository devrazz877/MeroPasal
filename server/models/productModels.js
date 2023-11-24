import mongoose from "mongoose"
const productschema = mongoose.Schema({
    productname:{
        type:String,
        required:[true,"please enter productname"]
    },
    description:{
        type:String,
        trim:true,
        required:[true,"pls enter the description"]
    },
    price:{
        type:Number,
        required:[true,"pls enter the price"]
    },
    productimage:{
        url:{
            type:String,
        },
        
    },

    ratings:{
        type:Number,
    
    },
    manufacture:{
        type:String,
    
    },
category:{
    type:String,
    required:[true,"pls enter the category"]
},
isinstock:{
    type:Number,
    require:[true,"pls enter isin stock or not?"]
},
SKU:{
    type:String,
},
createdate:{
    type:Date,
    default:Date.now
}


})


const Product = new mongoose.model("product",productschema)
export default Product