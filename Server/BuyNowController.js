
const BuyerSchema = require('./BuyNowSchema');

const processCheckout = (req, res) => {
    // Destructure all expected fields from the request body for clarity and security
    const {
        fullName,
        address,
        city,
        zip,
        cardNumber,
        expiry,
        cvv,
        quantity,
        UserId,
        productIds 
    } = req.body;



    const newOrder = new BuyerSchema({
         fullName,
        address,
        city,
        zip,
        cardNumber,
        expiry,
        cvv,
        quantity,
        UserId,
        productIds 
    });

    newOrder.save()
        .then((product) => {
console.log(product);

            res.status(201).json({ 
                data: product,
                msg: "Order placed successfully!"
            });
        })
        .catch((error) => {
            console.error("Error saving the order:", error); // Log the full error for debugging
            res.status(500).json({
                msg: "There was an error processing your order. Please try again.",
                error: error.message // Optionally send a more specific error message in development
            });
        });
};

const processCheckoutUser = (req, res) => {
    // Destructure all expected fields from the request body for clarity and security
    const {
        fullName,
        address,
        city,
        zip,
        cardNumber,
        expiry,
        cvv,
        quantity,
        UserId,
        productIds 
    } = req.body;



    const newOrder = new BuyerSchema({
         fullName,
        address,
        city,
        zip,
        cardNumber,
        expiry,
        cvv,
        quantity,
        UserId,
        productIds 
    });

    newOrder.save()
        .then((product) => {
console.log(product);

            res.status(201).json({ 
                data: product,
                msg: "Order placed successfully!"
            });
        })
        .catch((error) => {
            console.error("Error saving the order:", error); // Log the full error for debugging
            res.status(500).json({
                msg: "There was an error processing your order. Please try again.",
                error: error.message // Optionally send a more specific error message in development
            });
        });
};

const viewAllPurchases = (req, res) => {
    BuyerSchema.find()
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })

};
const viewAllPurchasesaUser = (req, res) => {
    BuyerSchema.find({UserId:req.params.UserId})
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })

};

const viewBuyer =(req,res)=>{
    BuyerSchema.find({UserId:req.body.UserId})
       .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })
}

const viewPurchaseById = (req, res) => {
    const purchaseId = req.params.id;
    BuyerSchema.findById(purchaseId)
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })

};


const updatePurchase = (req, res) => {
    const purchaseId = req.params.id;
    const updateData = {
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        quantity:req.body.quantity
    };

    BuyerSchema.findByIdAndUpdate(purchaseId, updateData, { new: true })
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })

};


const deletePurchase = (req, res) => {
    const purchaseId = req.params.id;

    BuyerSchema.findByIdAndDelete(purchaseId)
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error);

        })

};


module.exports = {
    processCheckout,
    viewAllPurchases,
    viewPurchaseById,
    updatePurchase,
    deletePurchase,
    viewBuyer,
    viewAllPurchasesaUser
};