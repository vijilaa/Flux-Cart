const ProductOrderSchema = require('./OrderSchema')
const OrSchema = (req, res) => {
    const order = new ProductOrderSchema({
        UserId: req.params.UserId,
        ProductId: req.params.ProductId

    })
    order.save()
        .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error.message,
                msg: "failed"
            });
        })
}

const viewOrderId = (req, res) => {
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

const UserOrders = (req, res) => {
    const UId = req.params.UserId;
    ProductOrderSchema.find({
        UserId: UId
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
const OrderDelete = (req, res) => {

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

const updateorder = (req, res) => {
    const OrderId = req.params.id;
    ProductOrderSchema.findByIdAndUpdate(OrderId, { status: true }, { new: true })
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })

        })
        .catch((err) => {
            console.log(err);

        })

}
const updateOrderStatusesByProductIds = async (req, res) => {
    const { productIds } = req.body; // Expecting an array of product IDs in the request body

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ msg: "No product IDs provided for status update." });
    }

    try {
        // Find all orders where ProductId is in the provided productIds array
        // And update their status to true
        const updateResult = await ProductOrderSchema.updateMany(
            { ProductId: { $in: productIds }, UserId: req.body.UserId }, // Find orders where ProductId is in the array AND belongs to the user
            { status: true },
            { new: true } // {new: true} is not directly applicable to updateMany, but it doesn't hurt.
        );

        // updateMany returns an object with information like matchedCount and modifiedCount
        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ msg: "No matching orders found or no status changes were made." });
        }

        res.json({
            data: updateResult,
            msg: `Successfully updated status for ${updateResult.modifiedCount} orders.`
        });

    } catch (error) {
        console.error("Error updating order statuses:", error);
        res.status(500).json({ msg: "Internal server error while updating order statuses." });
    }
};

module.exports = { OrSchema, viewOrderId, ViewOrder, UserOrders, OrderDelete, updateorder ,updateOrderStatusesByProductIds}