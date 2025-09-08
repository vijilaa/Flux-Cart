const mongoose = require("mongoose")
const { UserId } = require("./RegistrationController")
const product = mongoose.Schema({
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      category: { type: String },
      stock: { type: Number },
      image: { type: Object },
      count:{type:Number},
      SellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
      UserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]


})
module.exports = mongoose.model('Product', product)

