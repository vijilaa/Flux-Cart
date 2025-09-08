import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUsersView.css'; // We will create this CSS file next
import AdminSidebar from './AdminSidebar';

const AdminUsersView = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State to hold any potential errors
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch data from your backend API
    axios.get("http://localhost:5000/viewall")
      .then(response => {
        // If the request is successful, update the users state
        setUsers(response.data.data);
      })
      .catch(error => {
        // If there's an error, update the error state
        setError("Could not fetch user data.");
        console.error('There was an error fetching the user data!', error);
      })
      .finally(() => {
        // This always runs, so we stop the loading indicator here
        setLoading(false);
      });
  }, []); // The empty array ensures this runs only once when the component mounts

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="user-container"><p>Loading users...</p></div>;
  }

  // Show an error message if the API call failed
  if (error) {
    return <div className="user-container error-message">{error}</div>;
  }

  return (
    <div className="user-container">
      <div>
        <AdminSidebar />
      </div>
      <div>
        <h1 className="user-header">All Registered Users</h1>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if the users array has data */}
            {users.length > 0 ? (
              // If yes, loop through it and create a table row for each user
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.password}</td>
                </tr>
              ))
            ) : (
              // If no, show a message in the table
              <tr>
                <td colSpan="3" className="no-data-message">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersView;