const express =require('express')
const app = express.Router()


const RegistrationController = require("./RegistrationController")
app.post('/userregister',RegistrationController.UserRegistration)
app.get('/viewall',RegistrationController.ViewUser )
app.get('/useone/:id',RegistrationController.UserId)
app.post('/one',RegistrationController.findOneUser)
app.put('/update/:id',RegistrationController.UpdateUser)
app.delete('/delete/:id',RegistrationController.deleteUser)


const SellerController = require("./SellerController")
app.post('/sellerregister',SellerController.SellerRegisterSchema)
app.get('/viewallseller',SellerController.ViewSeller)
app.get('/oneseller/:id',SellerController.SellerId)
app.post('/foneseller',SellerController.findOneSeller)
app.put('/updateseller/:id',SellerController.UpdateSeller)
app.delete('/deleteseller/:id',SellerController.deleteSeller)

const AddProductController = require('./AddProductController')
app.post('/productregister',AddProductController.productImage,AddProductController.AddProSchema)
app.get('/allproduct',AddProductController.ViewProduct)
app.get('/Editproduct/:id',AddProductController.viewproductId)
app.put('/productupdate/:id',AddProductController.productImage, AddProductController.Productupdate)
app.delete('/deleteproduct/:id',AddProductController.deleteProduct)
app.put('/OrderConfirm/:id', AddProductController.BuyProduct)
app.put('/Stock', AddProductController.Productupdate)
app.put('/BuyStock/:id',AddProductController.StockProduct)



const OrderController = require('./OrderController')
app.post('/Orderid/:UserId/:ProductId',OrderController.OrSchema)
app.get('/vieworder/:OrderId',OrderController.viewOrderId )
app.get('/viewallorder',OrderController.ViewOrder)
app.get('/userorders/:UserId',OrderController.UserOrders)
app.delete('/deleteorder/:id',OrderController.OrderDelete)


const ContactController = require('./ContactController'); 
app.post('/addcontact', ContactController.AddContact);
app.post('/Resolve', ContactController.Resolve);
app.get('/viewcontact/:id', ContactController.viewContactById);
app.get('/viewallcontacts', ContactController.ViewContacts);
app.put('/updatecontact/:id', ContactController.ContactUpdate);
app.delete('/deletecontact/:id', ContactController.deleteContact);



const BuyerController = require('./BuyNowController'); 
app.post('/processcheckout/:id', BuyerController.processCheckout);
app.post('/processCheckoutUser', BuyerController.processCheckout);

app.get('/viewallpurchases', BuyerController.viewAllPurchases);
app.get('/viewpurchase/:id', BuyerController.viewPurchaseById);
app.put('/updatepurchase/:id', BuyerController.updatePurchase);
app.delete('/deletepurchase/:id', BuyerController.deletePurchase);
app.get('/Viewbuyerr', BuyerController.viewBuyer )
app.get('/viewallpurchases/:id', BuyerController.viewAllPurchasesaUser);


module.exports = app