const ProductOrderSchema = require('./OrderSchema')
const OrSchema = (req,res)=>{
 const order = new ProductOrderSchema({
    UserId : req.params.UserId,
    ProductId: req.params.ProductId

 })
 order.save()
 .then((result)=>{
    res.json({
        data:result,
        msg:"successful"
    })
 })
 .catch((error)=>{
    console.log(error);
    
 })
}

const viewOrderId = (req,res)=>{
     const OrderId = req.params.OrderId;
          ProductOrderSchema.findById(OrderId)
            .populate("UserId")
            .populate("ProductId")
            .then((result) => {
                res.json({
                    data: result,
                    msg: "successful"
                })
            })
            .catch((error) => {
                console.log(error);
    
            })
}

const ViewOrder = (req, res) => {
  ProductOrderSchema.find()
.populate("ProductId")
        .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}

const UserOrders = (req, res)=>{
    const UId = req.params.UserId;
    ProductOrderSchema.find({
       UserId : UId
    })
    .populate("UserId")
            .populate("ProductId")
    .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}
const OrderDelete =(req,res)=>{

    const OrderId = req.params.id;

  ProductOrderSchema.findByIdAndDelete(OrderId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })

}


module.exports={OrSchema, viewOrderId,ViewOrder,UserOrders,OrderDelete}