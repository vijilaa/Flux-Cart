import React from 'react'
import './Profile.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom' // Import useNavigate

const Profile = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const UserId = localStorage.getItem("UserId")
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (UserId) {
            axios.get(`http://localhost:5000/useone/${UserId}`)
                .then((res) => {
                    console.log(res.data.data);
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [UserId]);

    const handleUpdateProfile = () => {


        // You can navigate to an update page, e.g.:
        navigate(`/edit-profile/${UserId}`);
        // Or you could open a modal for editing
        console.log("Update Profile button clicked!");
    };

    return (
        <div>
            <div className='img-1'>
                <div className="card-1">
                    <div className="img-2">
                        <img className="img-2" src={`http://localhost:5000/upload/${user?.image?.filename}`} alt="Profile Silhouette" />
                    </div>
                    <div className="details">
                        {user ? (
                            <>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Number: {user.number}</p>
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
        </div>
    )
}

export default Profile