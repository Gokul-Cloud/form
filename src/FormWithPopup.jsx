/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import "./form.css";

const FormWithPopup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
    Address: "",
    Student: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            className="form-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            className="form-input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Birthdate:
          <input
            className="form-input"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            className="form-input"
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Student:
          <input
            className="form-input"
            type="checkbox"
            name="Student"
            checked={formData.Student}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="popup-container">
          <div className="popup-box">
            <h2 className="popup-title"> Details</h2>
            <div className="popup-details">
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Gender: {formData.gender}</p>
              <p>Phone: {formData.phone}</p>
              <p>Date of birth: {formData.birthdate}</p>
              <p>Student: {formData.Student ? "Yes" : "No"}</p>
              <p>address: {formData.Address}</p>
            </div>
            <button className="popup-close" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormWithPopup;
