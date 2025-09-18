import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminNewRegistration.css';
import AdminSidebar from './AdminSidebar'; // You'll want some CSS for this


const AdminNewRegistration = () => {
    // State to store the sellers awaiting approval
    const [pendingSellers, setPendingSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch pending sellers
    const fetchPendingSellers = () => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:5000/viewallseller`)
            .then(res => {
                console.log("All Sellers Data:", res.data.data);
                const newRegistrations = res.data.data.filter(seller => seller.AdminStatus === false || seller.AdminStatus === undefined);
                setPendingSellers(newRegistrations);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching sellers:", err);
                setError("Failed to load seller registrations.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPendingSellers();
    }, []); // Run once on component mount

    // Function to update a seller's adminStatus
    const updateSellerStatus = (sellerId, newStatus) => {
        // Assuming your backend has an endpoint like /updatesellerstatus/:id
        // and expects a body like { adminStatus: true/false }
        axios.put(`http://localhost:5000/activate/${sellerId}`, { AdminStatus: newStatus })
            .then(res => {
                pendingSellers.filter(seller=>seller._AdminStatus ==false)
                console.log(`Seller ${sellerId} status updated to ${newStatus}`, res.data);
                // After successful update, re-fetch the list to reflect changes
                fetchPendingSellers();
            })
            .catch(err => {
                console.error(`Error updating seller ${sellerId} status:`, err);
                setError("Failed to update seller status. Please try again.");
            });
    };

    const handleAccept = (sellerId) => {
        updateSellerStatus(sellerId, true);
    };

    const handleReject = (sellerId) => {
        // For reject, you might want to either:
        // 1. Set adminStatus to false (if it was already false, it just confirms)
        // 2. Remove the seller entirely (requires a DELETE API call and careful confirmation)
        // 3. Set a specific "rejected" status if your backend supports it.
        // For simplicity, let's just re-fetch to remove it from pending list or handle as desired.
        // If "reject" means deleting, you'd call a delete endpoint here:
        if (window.confirm("Are you sure you want to reject and potentially remove this seller?")) {
            axios.delete(`http://localhost:5000/deleteseller/${sellerId}`) // Example delete endpoint
                .then(() => {
                    console.log(`Seller ${sellerId} rejected and removed.`);
                    fetchPendingSellers(); // Re-fetch to update the list
                })
                .catch(err => {
                    console.error(`Error deleting seller ${sellerId}:`, err);
                    setError("Failed to reject and remove seller.");
                });
        }
    };


    if (loading) {
        return <div className="admin-registration-container">Loading pending registrations...</div>;
    }

    if (error) {
        return <div className="admin-registration-container error-message">{error}</div>;
    }

    return (
        <div className="seller-dashboard-layout">
     <AdminSidebar/>
            <div className="admin-registration-container">
                <h2>New Seller Registrations ({pendingSellers.length})</h2>
                {pendingSellers.length === 0 ? (
                    <p>No new seller registrations pending.</p>
                ) : (
                    <div className="seller-list">
                        {pendingSellers.map(seller => (
                            <div key={seller._id} className="seller-card">
                                <h3>{seller.name || "Unnamed Seller"}</h3> {/* Assuming 'name' field */}
                                <p>Email: {seller.email}</p> {/* Assuming 'email' field */}
                                <p>Phone: {seller.number}</p> {/* Assuming 'phone' field */}
                                {/* Add more seller details here as needed */}
                                <div className="seller-actions">
                                    <button
                                        onClick={() => handleAccept(seller._id)}
                                        className="accept-button"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(seller._id)}
                                        className="reject-button"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNewRegistration;