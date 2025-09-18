import React, { useState, useEffect } from 'react';
import './SellerOrder.css';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/viewallpurchases`)
      .then(res => {
        // The data you provided shows res.data.data as an array of purchase objects.
        // Each purchase object contains an array of productIds.
        // We need to flatten this structure to display individual purchased products.
        const allPurchasedProducts = res.data.data.flatMap(purchase => {
          if (purchase.productIds && purchase.productIds.length > 0) {
            return purchase.productIds.map(product => ({
              // Add a unique ID for React's key prop, combining purchase and product ID
              purchaseProductId: `${purchase._id}-${product._id}`,
              orderId: purchase._id, // The ID of the purchase transaction
              productName: product.name,
              quantity: 1, // Assuming quantity is 1 per product entry in productIds array
              price: product.price,
              buyerName: purchase.fullName, // Buyer's full name from the purchase object
              orderDate: purchase.purchaseDate,
              productId: product._id, // The ID of the product
              productImage: product.image?.path // Assuming image path is nested
            }));
          }
          return []; // If no productIds, return an empty array for flatMap
        });
        setOrders(allPurchasedProducts);
        console.log("Processed Orders:", allPurchasedProducts);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="seller-dashboard-layout">
      <SellerSidebar/>
    <div className="orders-container">
      <h2>Seller Orders</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Buyer Name</th>
              <th>Order Date</th>
        
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.purchaseProductId}> {/* Use a unique key */}
                <td>{order.orderId}</td>
                <td>
                  {order.productImage && (
                    <td>
                      {order.productImage && (
                        <img
                          src={`http://localhost:5000/upload/${order.productImage.replace(/^Images[\\/]/, '')}`}
                          alt={order.productName}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                          }}
                        />
                      )}
                    </td>

                  )}
                </td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.price ? order.price.toFixed(2) : 'N/A'}</td> {/* Handle potential undefined price */}
                <td>{order.buyerName}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td> {/* Format date */}
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders to display.</p>
      )}
    </div>
    </div>
  );
};

export default SellerOrder;