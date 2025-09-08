import React, { useState } from 'react';
import './AdminSettings.css'; // We will create this animated CSS file next
import { FaUser, FaBell, FaShieldAlt, FaSave } from 'react-icons/fa';

const AdminSettings = () => {
  // State for form inputs (you would connect this to your backend)
  const [adminName, setAdminName] = useState('Admin User');
  const [adminEmail, setAdminEmail] = useState('admin@example.com');
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Here, you would typically make an API call to save the settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1 className="settings-header">Admin Settings</h1>
      
      <form onSubmit={handleSaveChanges} className="settings-grid">
        
        {/* Card 1: Profile Information */}
        <div className="settings-card" style={{ '--card-index': 1 }}>
          <h2 className="card-header">
            <FaUser className="card-icon" />
            Profile Information
          </h2>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="adminName">Admin Name</label>
              <input
                type="text"
                id="adminName"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="adminEmail">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Notifications */}
        <div className="settings-card" style={{ '--card-index': 2 }}>
          <h2 className="card-header">
            <FaBell className="card-icon" />
            Notifications
          </h2>
          <div className="card-body">
            <div className="form-group-toggle">
              <label htmlFor="notifications">Receive Email Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Security */}
        <div className="settings-card" style={{ '--card-index': 3 }}>
          <h2 className="card-header">
            <FaShieldAlt className="card-icon" />
            Security
          </h2>
          <div className="card-body">
            <div className="form-group-toggle">
              <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={twoFactorAuth}
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button type="button" className="secondary-button">Change Password</button>
          </div>
        </div>

        {/* Save Button Area */}
        <div className="settings-footer">
          <button type="submit" className="save-button">
            <FaSave />
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

