import React, { useEffect, useState } from 'react'; // <--- Make sure useState is imported
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BuyNowDetails.css'; // Make sure your CSS file path is correct

const BuyNowDetails = () => {
    // --- These state variables are CRUCIAL for 'purchases' to be defined ---
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('UserId');
    // ---------------------------------------------------------------------

    useEffect(() => {
        if (!userId) {
            setError("You must be logged in to view your purchases.");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/viewallpurchases`) // Assuming this endpoint returns ALL purchases
            .then(res => {
                // Assuming res.data.data is an array of all purchase details
                // Filter the purchases to only include those for the current userId
                const userPurchases = res.data.data.filter(buydetails => buydetails.UserId === userId);

                // Set the state with the filtered purchases only once
                setPurchases(userPurchases);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching purchases:", err);
                setError("Failed to load purchase history. Please try again.");
                setLoading(false);
            });
    }, [userId]); // Dependency array: re-run effect if userId changes// Dependency array: re-run effect if userId changes

    // --- Conditional Rendering for Loading, Error, and No Purchases ---
    if (loading) {
        return (
            <div className="buy-now-details-container">
                <div className="order-summary-card">
                    <h2>Loading Your Purchase History...</h2>
                    <p>Please wait while we fetch your orders.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="buy-now-details-container">
                <div className="purchase-history-card error-card"> {/* Changed to purchase-history-card */}
                    <h2>Error</h2>
                    <p>{error}</p>
                    <Link to="/" className="btn-primary">Go to Home</Link>
                </div>
            </div>
        );
    }

    if (purchases.length === 0) {
        return (
            <div className="buy-now-details-container">
                <div className="purchase-history-card"> {/* Changed to purchase-history-card */}
                    <h2>No Purchases Found</h2>
                    <p>It looks like you haven't made any purchases yet.</p>
                    <Link to="/" className="btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }
    // ---------------------------------------------------------------------

    // --- The 'return' function code you requested (now with 'purchases' defined) ---
    return (
        <div className="buy-now-details-container">
            <div className="purchase-history-card">
                <h2 className="history-title">Your Purchase History</h2>
                <p className="history-subtitle">Here are all your past orders.</p>

                {purchases.map((purchase, index) => (
                    <div key={purchase._id || index} className="purchase-item-card">
                        <h3 className="purchase-item-header">Order #{index + 1} - ID: {purchase._id}</h3>
                        <p><strong>Date:</strong> {new Date(purchase.createdAt).toLocaleDateString()}</p>

                        <div className="purchase-details-grid">
                            <div className="detail-group">
                                <h4>Shipping Info:</h4>
                                <p><strong>Name:</strong> {purchase.fullName}</p>
                                <p><strong>Address:</strong> {purchase.address}, {purchase.city}, {purchase.zip}</p>
                            </div>
                            <div className="detail-group">
                                <h4>Payment Info:</h4>
                                <p><strong>Card:</strong> **** **** **** {purchase.cardNumber ? purchase.cardNumber.slice(-4) : 'N/A'}</p>
                                <p><strong>Expiry:</strong> {purchase.expiry}</p>
                            </div>
                            <div className="detail-group">
                                <h4>Product(s):</h4>
                                {purchase.productIds && purchase.productIds.length > 0 ? (
                                    <ul>
                                        {purchase.productIds.map(productId => (
                                            <li key={productId}>Product ID: {productId}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No specific product IDs found.</p>
                                )}
                                <p><strong>Quantity:</strong> {purchase.quantity || 1}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="back-to-shop">
                    <Link to="home">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyNowDetails;