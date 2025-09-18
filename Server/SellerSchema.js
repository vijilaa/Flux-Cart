const mongoose =require("mongoose")
const seller =mongoose.Schema({
            name: {type:String},
            number:{type:Number, unique:true}, 
            email:{type:String, unique:true},
            password:{type:String},
            dob:{type:String},
            shopName:{type:String}, 
            gstNumber: {type:String, unique:true},
            businessAddress:{type:String},
            AdminStatus:{type:Boolean , default:false},
            image:{type:Object}

    })

module.exports=mongoose.model('Seller',seller)