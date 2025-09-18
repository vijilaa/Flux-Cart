import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminNewRegistration.css';
import AdminSidebar from './AdminSidebar';

const AdminNewRegistration = () => {
    const [pendingSellers, setPendingSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPendingSellers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/viewallseller');
            const newRegistrations = res.data.data.filter(seller => !seller.AdminStatus);
            setPendingSellers(newRegistrations);
        } catch (err) {
            setError('Failed to load seller registrations.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingSellers();
    }, []);

    const handleAccept = async (sellerId) => {
        try {
            await axios.put(`http://localhost:5000/activate/${sellerId}`, { AdminStatus: true });
            fetchPendingSellers();
        } catch {
            setError('Failed to approve seller.');
        }
    };

    const handleReject = async (sellerId) => {
        if (!window.confirm("Are you sure you want to reject this seller?")) return;
        try {
            await axios.delete(`http://localhost:5000/deleteseller/${sellerId}`);
            fetchPendingSellers();
        } catch {
            setError('Failed to reject seller.');
        }
    };

    return (
        <div className="seller-dashboard-layout">
            <AdminSidebar />
            <div className="admin-registration-container">
                <h2>New Seller Registrations ({pendingSellers.length})</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && pendingSellers.length === 0 && <p>No new seller registrations.</p>}

                <div className="seller-list">
                    {pendingSellers.map(seller => (
                        <div key={seller._id} className="seller-card">
                            <h3>{seller.name || 'Unnamed Seller'}</h3>
                            <p>Email: {seller.email}</p>
                            <p>Phone: {seller.number}</p>
                            <div className="seller-actions">
                                <button onClick={() => handleAccept(seller._id)} className="accept-button">
                                    Accept
                                </button>
                                <button onClick={() => handleReject(seller._id)} className="reject-button">
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminNewRegistration;
