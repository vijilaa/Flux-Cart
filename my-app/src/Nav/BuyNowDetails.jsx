import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BuyNowDetails.css';

const BuyNowDetails = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('UserId');

    useEffect(() => {
        if (!userId) {
            setError("You must be logged in to view your purchases.");
            setLoading(false);
            return;
        }

        const fetchPurchases = () => {
            axios.get(`http://localhost:5000/viewallpurchases`)
                .then(res => {
                    const userPurchases = res.data.data.filter(buydetails => buydetails.UserId === userId);
                    console.log("User Purchases:", userPurchases);

                    setPurchases(userPurchases);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching purchases:", err);
                    setError("Failed to load purchase history. Please try again. " + (err.response?.data?.message || err.message));
                    setLoading(false);
                });
        };

        fetchPurchases();
    }, [userId]);

    const handleDeletePurchase = (purchaseId) => {
        if (window.confirm("Are you sure you want to delete this purchase? This action cannot be undone.")) {
            axios.delete(`http://localhost:5000/deletepurchase/${purchaseId}`)
                .then(res => {
                    alert(res.data.message);
                    setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase._id !== purchaseId));
                })
                .catch(err => {
                    console.error("Error deleting purchase:", err);
                    alert("Failed to delete purchase. Please try again. " + (err.response?.data?.message || err.message));
                });
        }
    };

    if (loading) {
        return (
            <div className="buy-now-details-page-wrapper">
                <div className="buy-details-status-card buy-details-loading">
                    <h2 className="buy-details-status-title">Loading Your Purchase History...</h2>
                    <p className="buy-details-status-message">Please wait while we fetch your orders.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="buy-now-details-page-wrapper">
                <div className="buy-details-status-card buy-details-error">
                    <h2 className="buy-details-status-title">Error</h2>
                    <p className="buy-details-status-message">{error}</p>
                    <Link to="/" className="buy-details-status-button">Go to Home</Link>
                </div>
            </div>
        );
    }

    if (purchases.length === 0) {
        return (
            <div className="buy-now-details-page-wrapper">
                <div className="buy-details-status-card buy-details-empty">
                    <h2 className="buy-details-status-title">No Purchases Found</h2>
                    <p className="buy-details-status-message">It looks like you haven't made any purchases yet.</p>
                    <Link to="/home" className="buy-details-status-button">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="buy-now-details-page-wrapper">
            <div className="buy-details-content-area">
                <h2 className="buy-details-history-title">Your Purchase History</h2>
                <p className="buy-details-history-subtitle">Here are all your past orders.</p>

                {purchases.map((purchase, index) => (
                    <div key={purchase._id || index} className="buy-details-purchase-item-card">
                        <h3 className="buy-details-item-header">
                            <span className="buy-details-order-id-label">Order #{index + 1} - ID: {purchase._id}</span>
                            <button
                                className="buy-details-delete-button"
                                onClick={() => handleDeletePurchase(purchase._id)}
                            >
                                Delete Order
                            </button>
                        </h3>
                        <p className="buy-details-purchase-date"><strong>Date:</strong> {purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : 'N/A'}</p>

                        <div className="buy-details-info-grid">
                            <div className="buy-details-group">
                                <h4 className="buy-details-group-title">Shipping Info:</h4>
                                <p><strong>Name:</strong> {purchase.fullName || 'N/A'}</p>
                                <p><strong>Address:</strong> {purchase.address || 'N/A'}, {purchase.city || 'N/A'}, {purchase.zip || 'N/A'}</p>
                            </div>

                            <div className="buy-details-group buy-details-products-group">
                                <h4 className="buy-details-group-title">Product(s):</h4>
                                {purchase.productIds && purchase.productIds.length > 0 ? (
                                    <ul className="buy-details-product-list">
                                        {purchase.productIds.map((product, idx) => (
                                            <li key={product._id || idx} className="buy-details-product-list-item">
                                                {product.image && product.image.filename && (
                                                    <img
                                                        src={`http://localhost:5000/upload/${product.image.filename}`}
                                                        alt={product.name || 'Product Image'}
                                                        className="buy-details-product-thumbnail"
                                                    />
                                                )}
                                                <div className="buy-details-product-info">
                                                    <p><strong>Name:</strong> {product.name || 'N/A'}</p>
                                                    <p><strong>Price:</strong> ${product.price !== undefined ? product.price.toFixed(2) : 'N/A'}</p>
                                                    <p><strong>ID:</strong> {product._id || 'N/A'}</p>
                                                    {product.quantity && <p><strong>Quantity:</strong> {product.quantity}</p>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="buy-details-no-products-message">No specific product IDs found, or items might be directly associated with the purchase quantity.</p>
                                )}
                                {purchase.quantity && purchase.productIds?.length === 0 && (
                                     <p className="buy-details-total-quantity"><strong>Total Quantity:</strong> {purchase.quantity}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="buy-details-back-to-shop">
                    <Link to="/home" className="buy-details-back-to-shop-button">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyNowDetails;