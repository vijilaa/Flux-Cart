import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SellerProfileEdit.css'; // You'll need to create this CSS file

const SellerProfileEdit = () => {
    const { id } = useParams(); // 'id' from URL will be the SellerId
    const navigate = useNavigate();
    const SellerId = localStorage.getItem("SellerId"); // Ensure this is correctly stored

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        dob: '',
        shopName: '',
        businessAddress: '',
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    useEffect(() => {
        if (!SellerId) {
            console.error("Seller ID not found in localStorage.");
            navigate('/seller-login'); 
            return;
        }

        const fetchSellerData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/oneseller/${SellerId}`);
                console.log("Fetched seller data:", res.data.data);
                if (res.data.data) {
                    const sellerData = res.data.data;
                    setFormData({
                        name: sellerData.name,
                        email: sellerData.email,
                        number: sellerData.number,
                        dob: sellerData.dob,
                        shopName: sellerData.shopName,
                        businessAddress: sellerData.businessAddress,
                        image: null, 
                    });
                  
                    if (sellerData.image && sellerData.image.filename) {
                        setPreviewUrl(`http://localhost:5000/upload/${sellerData.image.filename}`);
                    }
                }
            } catch (err) {
                console.error("Error fetching seller data for editing:", err);
                alert("Failed to load seller profile data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellerData();
    }, [SellerId, navigate]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

   
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevFormData => ({
                ...prevFormData,
                image: file 
            }));
            setPreviewUrl(URL.createObjectURL(file)); 
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                image: null
            }));
        
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object for submission
        const submitFormData = new FormData();
        submitFormData.append('name', formData.name);
        submitFormData.append('email', formData.email);
        submitFormData.append('number', formData.number);
        submitFormData.append('dob', formData.dob);
        submitFormData.append('shopName', formData.shopName);
        submitFormData.append('businessAddress', formData.businessAddress);

        if (formData.image) {
            submitFormData.append('image', formData.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/updateseller/${SellerId}`, submitFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Seller profile updated successfully:", response.data);
            alert("Seller profile updated successfully!"); 
            navigate(`/sellerprofile`); 
        } catch (err) {
            console.error("Failed to update seller profile:", err.response ? err.response.data : err.message);
            alert(`Failed to update seller profile: ${err.response?.data?.message || err.message}`);
        }
    };

    if (isLoading) {
        return <div className="edit-seller-profile-container">Loading seller profile data...</div>;
    }

    return (
        <div className="edit-seller-profile-container">
            <h2>Edit Seller Profile</h2>
            <form onSubmit={handleSubmit} className="edit-seller-profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Number:</label>
                    <input
                        type="text"
                        id="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="shopName">Shop Name:</label>
                    <input
                        type="text"
                        id="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="businessAddress">Business Address:</label>
                    <input
                        type="text"
                        id="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="profileImage">Profile Image:</label>
                    {previewUrl ? (
                        <div className="current-image-preview">
                            <p>Current/New Image:</p>
                            <img
                                src={previewUrl}
                                alt="Profile Preview"
                                className="current-profile-img"
                            />
                        </div>
                    ) : (
                        <div className="current-image-preview">
                            <p>No image selected.</p>
                        </div>
                    )}
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <small>Select a new image to change your profile picture.</small>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default SellerProfileEdit;