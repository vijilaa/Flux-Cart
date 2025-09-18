import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUsersView.css';
import AdminSidebar from './AdminSidebar';

const AdminUsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/viewall")
      .then(res => setUsers(res.data.data))
      .catch(() => setError("Failed to fetch users."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="user-container"><p>Loading users...</p></div>;
  if (error) return <div className="user-container error-message">{error}</div>;

  return (
    <div className="user-container">
      <AdminSidebar />
      <div>
        <h1 className="user-header">All Registered Users</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id}>
                  <td>
                    {user.image?.filename ? (
                      <img
                        src={`http://localhost:5000/upload/${user.image.filename}`}
                        alt={user.name}
                        className="user-profile-image"
                      />
                    ) : 'No Image'}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.password}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data-message">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersView;
