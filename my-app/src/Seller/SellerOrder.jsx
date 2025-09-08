import React, { useState } from 'react';
import './SellerOrder.css';

const initialOrders = [
  {
    id: 1,
    customer: 'Alice Johnson',
    product: 'Wireless Mouse',
    quantity: 2,
    total: 51.98,
    status: 'Pending',
  },
  {
    id: 2,
    customer: 'Bob Smith',
    product: 'Bluetooth Headphones',
    quantity: 1,
    total: 99.99,
    status: 'Pending',
  },
];

const SellerOrder = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleAccept = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: 'Accepted' } : order
      )
    );
  };

  const handleReject = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: 'Rejected' } : order
      )
    );
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Total ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id} className={`status-${order.status.toLowerCase()}`}>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (
                  <>
                    <button
                      className="btn-accept"
                      onClick={() => handleAccept(order.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(order.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {(order.status === 'Accepted' || order.status === 'Rejected') && (
                  <em>No actions</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrder;