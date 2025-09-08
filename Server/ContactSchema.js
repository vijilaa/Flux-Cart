const mongoose = require("mongoose")
const contact = mongoose.Schema({
name: { type: String, },
email: { type: String, },
subject: { type: String,},
message: { type: String,},
status:{type:String , default:"new"}
})

module.exports=mongoose.model('contact',contact)