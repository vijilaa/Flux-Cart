const mongoose =require('mongoose')

mongoose.connect('mongodb://127.0.0.1/Ecom-Project')
var db = mongoose.connection
db.on('error' , console.error.bind('error'))

db.once('open', async () => {
    console.log("Database connected");
    try {
        await mongoose.connection.db.collection('orders').dropIndex('ProductId_1');
        console.log("Dropped unique index ProductId_1 from orders collection");
    } catch (e) {
        console.log("Unique index ProductId_1 not found or already dropped:", e.message);
    }
})

module.exports = db