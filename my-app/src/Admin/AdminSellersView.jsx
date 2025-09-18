import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar'; // Make sure the path is correct
import './AdminSellersView.css'; // Import the new CSS file

const AdminSellersView = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/viewallseller")
      .then(response => {
        setSellers(response.data.data);
      })
      .catch(error => {
        setError('Failed to fetch seller details. Please try again later.');
        console.error("Error fetching sellers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    // You can add a more sophisticated spinner here if you like
    return <div className="seller-layout-container"><p>Loading seller details...</p></div>;
  }

  return (
    <div className="seller-layout-container">
      <AdminSidebar />
      <main className="seller-content-area">
        <h1 className="seller-header">All Seller Details</h1>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Image</th> {/* This header is for the seller's image */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Shop Name</th>
                  <th>GST Number</th>
                  <th>Business Address</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {sellers.length > 0 ? (
                  sellers.map((seller, index) => (
                    <tr key={seller._id} style={{ '--row-index': index }}>
                     <td>
                      <img
                        src={`http://localhost:5000/upload/${seller.image.filename}`}
                        alt={seller.name}
                        className="user-profile-image" // Add a class for styling
                      />

</td>

                      <td>{seller.name || 'N/A'}</td>
                      <td>{seller.email || 'N/A'}</td>
                      <td>{seller.number || 'N/A'}</td>
                      <td>{seller.shopName || 'N/A'}</td>
                      <td>{seller.gstNumber || 'N/A'}</td>
                      <td>{seller.businessAddress || 'N/A'}</td>
                      <td>{formatDate(seller.dob)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data-message">No sellers found.</td> {/* Corrected colspan */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSellersView;