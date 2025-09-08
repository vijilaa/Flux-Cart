const mongoose=require("mongoose")
const User = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    number:{type:Number},
    password:{type:String},
    repeatPassword:{type:String},
    image: {type:Object}
})
 module.exports=mongoose.model('User',User)