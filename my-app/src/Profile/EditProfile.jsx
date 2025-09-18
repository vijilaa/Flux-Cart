import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const UserId = localStorage.getItem("UserId");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!UserId) {
            navigate('/login');
            return;
        }

        axios.get(`http://localhost:5000/useone/${UserId}`)
            .then(res => {
                const user = res.data.data;
                setFormData({
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    image: null,
                });
                if (user.image?.filename) {
                    setPreviewUrl(`http://localhost:5000/upload/${user.image.filename}`);
                }
                setIsLoading(false);
            })
            .catch(() => {
                alert("Failed to load profile data.");
                setIsLoading(false);
            });
    }, [UserId, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, image: null }));
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitFormData = new FormData();
        submitFormData.append('name', formData.name);
        submitFormData.append('email', formData.email);
        submitFormData.append('number', formData.number);
        if (formData.image) {
            submitFormData.append('image', formData.image);
        }

        try {
            await axios.put(`http://localhost:5000/update/${UserId}`, submitFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert("Profile updated successfully!");
            navigate('/profile');
        } catch {
            alert("Failed to update profile.");
        }
    };

    if (isLoading) return <div className="edit-profile-container">Loading...</div>;

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
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
                    <label htmlFor="profileImage">Profile Image:</label>
                    {previewUrl && (
                        <div className="current-image-preview">
                            <img src={previewUrl} alt="Profile" className="current-profile-img" />
                        </div>
                    )}
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
