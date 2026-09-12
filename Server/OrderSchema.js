const { status } = require("init")
const mongoose= require("mongoose")
const order  =  mongoose.Schema({
      UserId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      ProductId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
      status: {type:Boolean, default:false}
})

 module.exports=mongoose.model('order',order)