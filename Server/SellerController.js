const SellSchema = require('./SellerSchema')
 
const SellerRegisterSchema = (req,res)=>{
    const seller = new SellSchema({
            name: req.body.name,
            number:req.body.number, 
            email:req.body.email,
            password: req.body.password,
            dob:req.body.dob,
            shopName: req.body.shopName, 
            gstNumber: req.body.gstNumber, 
            businessAddress: req.body.businessAddress 
    })
    seller.save()
    .then((result)=>{
           res.json({
            data:result,
            msg:"successful"
           })
    })
    .catch((error)=>{
        console.log(error)
        if(error.code==11000){
            res.json({
                msg:"Make unique data"
            })
        }
    })
}
const ViewSeller = (req, res) => {
    SellSchema.find()
        .then((result) => {
            // This block only runs on success
            res.json({
                data: result,
                msg: "successful"
            });
        })
        .catch((error) => {
            // This block now correctly catches errors from SellSchema.find()
            console.log("Error fetching sellers:", error);
            res.status(500).json({
                msg: "An error occurred while fetching sellers."
            });
        });
};
const SellerId = (req, res) => {
    const SelleId = req.params.id;
    SellSchema.findById(SelleId)
        .then((result) => {
            // This block only runs on success
            res.json({
                data: result,
                msg: "successful"
            });
        })
        .catch((error) => {
            // This block now correctly catches errors from SellSchema.findById()
            console.log("Error fetching seller by ID:", error);
            res.status(500).json({
                msg: "An error occurred while fetching the seller."
            });
        });
};
const findOneSeller = (req, res) => {
  const { email } = req.body;

  SellSchema.findOne({ email })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          data: null,
          msg: "User not found"
        });
      }

      res.json({
        data: result,
        msg: "Successful"
      });
    })
    .catch((error) => {
      console.error("Database error:", error);
      res.status(500).json({
        data: null,
        msg: "Server error"
      });
    });
};
const UpdateSeller =(req, res)=>{
    const SelleId=req.params.id;
    const updateData={
             name: req.body.name,
            number:req.body.number, 
            email:req.body.email,
            password: req.body.password,
            dob:req.body.dob,
            shopName: req.body.shopName, 
            gstNumber: req.body.gstNumber, 
            businessAddress: req.body.businessAddress 
    };
   SellSchema.findByIdAndUpdate(SelleId,updateData,{new:true})
    .then((result)=>{
        res.json({
            data:result,
            msg:"sucessful"
        })
        .catch((error)=>{
            console.log(error);
            
        })
    })
}
const deleteSeller = (req, res) => {
    const SelleId = req.params.id;

SellSchema.findByIdAndDelete(SelleId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};

module.exports={SellerRegisterSchema,ViewSeller,SellerId,findOneSeller,UpdateSeller,deleteSeller}