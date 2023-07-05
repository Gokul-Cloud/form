/* eslint-disable no-prototype-builtins */
import { useState } from "react"; 


const FormWithPopup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    birthdate: "",
    favoriteColor: "",
    Student: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let popupContent = "Submitted Data" + '\n';
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        popupContent +=   key + `: ` + formData[key] + '\n';
      }
    }

    window.alert(popupContent);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
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
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Favorite Color:
          <input
            type="color"
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Student:
          <input
            type="checkbox"
            name="Student"
            checked={formData.Student}
            onChange={handleChange}
          />
        </label>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithPopup;
