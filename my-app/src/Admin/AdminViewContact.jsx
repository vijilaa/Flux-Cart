import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminViewContact.css'; // Don't forget to create this CSS file
import AdminSidebar from './AdminSidebar';

const AdminViewContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

   const fetchContacts = async () => {
    try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/viewallcontacts');
        console.log("Fetched contacts:", response.data);

        // Adjust based on actual API structure
        const contactArray = Array.isArray(response.data)
            ? response.data
            : response.data.contacts || response.data.data || [];

        setContacts(contactArray);
        setLoading(false);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to fetch contact messages. Please try again.');
        setLoading(false);
    }
};


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
            try {
                // Make a DELETE request to your backend with the contact's ID
                await axios.delete(`http://localhost:5000/deletecontact/${id}`);
                alert('Contact message deleted successfully!');
                fetchContacts(); // Refresh the list after successful deletion
            } catch (err) {
                console.error('Error deleting contact:', err);
                alert('Failed to delete contact message. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="admin-contact-container">Loading contact messages...</div>;
    }

    if (error) {
        return <div className="admin-contact-container error-message">{error}</div>;
    }

    return (
        <div className="seller-layout-container">
      <AdminSidebar />
        <div className="admin-contact-container">
            <h2>All Contact Messages</h2>
            {contacts.length === 0 ? (
                <p>No contact messages to display.</p>
            ) : (
                <div className="contact-list">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="contact-card">
                            <h3>From: {contact.name}</h3>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Subject:</strong> {contact.subject}</p>
                            <p><strong>Message:</strong> {contact.message}</p>
                            <p className="date">Received on: {new Date(contact.createdAt).toLocaleString()}</p>
                            <button
                                onClick={() => handleDelete(contact._id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            {/* You could add a 'Resolve' button here if you implement it */}
                            {/* <button className="resolve-button">Resolve</button> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

export default AdminViewContact;