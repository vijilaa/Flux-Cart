import React, { useState, useEffect } from 'react';
import './SellerProfile.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SellerProfile = () => {
    const [user, setUser] = useState(null);
    const SellerId = localStorage.getItem("SellerId");
    const navigate = useNavigate();

    useEffect(() => {
        if (SellerId) {
            axios.get(`http://localhost:5000/oneseller/${SellerId}`)
                .then((res) => {
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [SellerId]);

    const handleUpdateProfile = () => {
        navigate(`/edit-seller/${SellerId}`);
    };

    return (
        <div className="seller-background">
            <div className="profile-card">
                <div className="profile-image-container">
                    <img 
                        className="profile-image" 
                        src={`http://localhost:5000/upload/${user?.image?.filename}`} 
                        alt="Profile" 
                    />
                </div>
                <div className="profile-details">
                    {user ? (
                        <>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Number:</strong> {user.number}</p>
                            <p><strong>DOB:</strong> {user.dob}</p>
                            <p><strong>Shop Name:</strong> {user.shopName}</p>
                            <p><strong>Business Address:</strong> {user.businessAddress}</p>
                            <button className="update-button" onClick={handleUpdateProfile}>
                                Update Profile
                            </button>
                        </>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerProfile;
