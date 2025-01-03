import React, { useState } from "react";
import axios from "axios";
import "./AddUser.css";
import Dashboard from "../Dashboard/Dashboard";
import { baseUrl } from "../Urls";
import { useParams, useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "", // Default email (editable)
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/user`, formData);
      console.log("Response:", response.data);
      alert("User added successfully!");
      navigate("/users/user-list");
      // Optionally, reset the form or navigate to another page
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="add-user-container">
      <Dashboard />
      <main className="main-content">
        <header className="header">
          <h1>Add New User</h1>
        </header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User Name *</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter Your User Name"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange} // Make the email editable
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter Your Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter New Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">Add New</button>
        </form>
        <footer className="footer">
          © 2024. All rights reserved by Dwinsoft Technologies India Pvt Ltd.
        </footer>
      </main>
    </div>
  );
};

export default AddUser;
