import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: user.name,
    email: user.email,
    department: user.department, // Assuming students have a department or class
    grade: user.grade || "", // Add a grade field if relevant
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isChangingPassword) {
      setPasswords({
        ...passwords,
        [name]: value,
      });
    } else if (isEditing) {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Logic to save edited data
    console.log("Edited profile data:", editFormData);
    // Add API call to save edited profile
    axios.put(`http://localhost:1008/${user.role}/updateProfile`, editFormData, {
      headers: {
        Authorization: `Bearer ${token}` // Use Bearer token for Authorization
      }
    })
    .then((res) => {
      console.log("Profile updated:", res.data);
      setIsEditing(false);
    })
    .catch(err => console.log(err));
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Logic to change password
    axios.post(`http://localhost:1008/${user.role}/changePassword`, {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Use Bearer token for Authorization
      }
    })
    .then((res) => {
      console.log("Password changed:", res.data);
      setIsChangingPassword(false);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <Header />
      <div className={`container mt-5 ${isEditing || isChangingPassword ? "blur-background" : ""}`}>
        {user ? (
          <div className="card">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{user.name}'s Profile</h3>
              <div>
                <button className="btn btn-warning me-3" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn btn-danger" onClick={() => setIsChangingPassword(true)}>Change Password</button>
              </div>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Grade:</strong> {user.grade || "N/A"}</p> {/* Display grade if available */}
            </div>
          </div>
        ) : (
          <p>No user data found. Please log in.</p>
        )}
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Edit Profile</h4>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={editFormData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Grade</label>
                <input
                  type="text"
                  className="form-control"
                  name="grade"
                  value={editFormData.grade}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-success">Save</button>
              <button className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangingPassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Change Password</h4>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-success">Change Password</button>
              <button className="btn btn-secondary ms-2" onClick={() => setIsChangingPassword(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
