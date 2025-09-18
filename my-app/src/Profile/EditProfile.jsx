// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProfile.css'; // Keep the CSS for styling

const EditProfile = () => {
    const { id } = useParams(); // 'id' from URL is not strictly needed if using UserId from localStorage
    const navigate = useNavigate();
    const UserId = localStorage.getItem("UserId");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        image: null, // Stores the File object if a new one is selected
    });

    const [previewUrl, setPreviewUrl] = useState(null); // Stores the URL for immediate image preview
    const [isLoading, setIsLoading] = useState(true); // To manage loading state

    // Fetch existing user data when the component mounts
    useEffect(() => {
        if (!UserId) {
            console.error("User ID not found in localStorage.");
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/useone/${UserId}`);
                console.log("Fetched user data:", res.data.data);
                if (res.data.data) {
                    setFormData({
                        name: res.data.data.name,
                        email: res.data.data.email,
                        number: res.data.data.number,
                        image: null, // IMPORTANT: Do not set a File object here.
                                     // This ensures 'formData.image' is only a new file if selected.
                    });
                    // Set the preview URL from the existing image
                    if (res.data.data.image && res.data.data.image.filename) {
                        setPreviewUrl(`http://localhost:5000/upload/${res.data.data.image.filename}`);
                    }
                }
            } catch (err) {
                console.error("Error fetching user data for editing:", err);
                alert("Failed to load profile data.");
            } finally {
                setIsLoading(false); // Done loading
            }
        };

        fetchUserData();
    }, [UserId, navigate]);

    // Handler for changes in text input fields
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

    // Handler for file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevFormData => ({
                ...prevFormData,
                image: file // Store the actual File object
            }));
            setPreviewUrl(URL.createObjectURL(file)); // Create a URL for immediate preview
        } else {
            // If the user clears the file input, remove the file from formData
            setFormData(prevFormData => ({
                ...prevFormData,
                image: null
            }));
            // Optionally revert to the initial image or a placeholder if no new file is selected
            // For now, if cleared, preview will just disappear or show initial if re-fetched.
            // A more robust solution might store the initial image URL separately.
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object for submission
        const submitFormData = new FormData();
        submitFormData.append('name', formData.name);
        submitFormData.append('email', formData.email);
        submitFormData.append('number', formData.number);

        // Only append the image if a new one has been selected (formData.image will be a File object)
        if (formData.image) {
            submitFormData.append('image', formData.image);
        } else {
            // OPTIONAL: If your backend needs to know if no new image was provided,
            // or if you want to explicitly signal to *keep* the old image,
            // you might send a flag. But typically, just not sending 'image' is enough.
            // submitFormData.append('keepExistingImage', 'true');
        }

        try {
            // You can show a loading indicator here
            const response = await axios.put(`http://localhost:5000/update/${UserId}`, submitFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Profile updated successfully:", response.data);
            alert("Profile updated successfully!"); // Give user feedback
            navigate(`/profile`); // Navigate back to profile page on success
        } catch (err) {
            console.error("Failed to update profile:", err.response ? err.response.data : err.message);
            alert(`Failed to update profile: ${err.response?.data?.message || err.message}`);
        }
    };

    if (isLoading) {
        return <div className="edit-profile-container">Loading profile data...</div>;
    }

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

export default EditProfile;