import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import './AdminViewContact.css';

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
            const res = await axios.get('http://localhost:5000/viewallcontacts');

            const contactList = Array.isArray(res.data)
                ? res.data
                : res.data.contacts || res.data.data || [];

            setContacts(contactList);
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setError('Failed to load contact messages.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this message?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/deletecontact/${id}`);
            alert('Deleted successfully.');
            fetchContacts();
        } catch (err) {
            console.error('Error deleting contact:', err);
            alert('Failed to delete. Try again.');
        }
    };

    if (loading) return <div className="admin-contact-container">Loading...</div>;
    if (error) return <div className="admin-contact-container error-message">{error}</div>;

    return (
        <div className="seller-layout-container">
            <AdminSidebar />
            <div className="admin-contact-container">
                <h2>Contact Messages</h2>
                {contacts.length === 0 ? (
                    <p>No messages found.</p>
                ) : (
                    <div className="contact-list">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-card">
                                <h3>{contact.name}</h3>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Subject:</strong> {contact.subject}</p>
                                <p><strong>Message:</strong> {contact.message}</p>
                                <p className="date">Received: {new Date(contact.createdAt).toLocaleString()}</p>
                                <button className="delete-button" onClick={() => handleDelete(contact._id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminViewContact;
