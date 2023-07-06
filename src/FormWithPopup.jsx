import { useState, useEffect } from "react";
import "./form.css";

const FormWithPopup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age:"",
    emailAddress: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    educationalQualification: ""
  });

  const [formValues, setFormValues] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Calculate age based on date of birth
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      setFormData((prevData) => ({
        ...prevData,
        age: age.toString(),
      }));
    }
  }, [formData.dateOfBirth]);

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validateFormFields();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newFormValues = [...formValues, formData];
    setFormValues(newFormValues);
    setFormData({
      name: "",
      age:"",
      emailAddress: "",
      mobileNumber: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      educationalQualification: "",
    });
    setFormErrors({});
  };

  const handleShowTable = () => {
    setShowTable(true);
  };
  const validateFormFields = () => {
    const errors = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (formData.mobileNumber.trim() === "") {
      errors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d+$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile Number must contain only digits";
    }

    if (formData.address.trim() === "") {
      errors.address = "Address is required";
    }

    if (formData.emailAddress.trim() === "") {
      errors.emailAddress = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Email Address is invalid";
    }

    if (formData.educationalQualification.trim() === "") {
      errors.educationalQualification = "Educational Qualification is required";
    }

    if (formData.gender.trim() === "") {
      errors.gender = "Gender is required";
    }

    if (formData.dateOfBirth.trim() === "") {
      errors.dateOfBirth = "Date of Birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 18) {
        errors.dateOfBirth = "Age must be at least 18 years old";
      }
    }

    // Validate age
    if (formData.age.trim() === "") {
      errors.age = "Age is required";
    } else if (isNaN(formData.age)) {
      errors.age = "Age must be a number";
    } else if (parseInt(formData.age) < 18) {
      errors.age = "Age must be at least 18 years old";
    }

    return errors;
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
            placeholder="Name..."
          />
          {formErrors.name && <p className="form-error">{formErrors.name}</p>}
        </label>
        <br />

        <label>
          Email:
          <input
            className="form-input"
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email..."
          />
          {formErrors.emailAddress && (
            <p className="form-error">{formErrors.emailAddress}</p>
          )}
        </label>
        <br />
        <div>
          <span>Gender:</span>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          {formErrors.gender && (
            <p className="form-error">{formErrors.gender}</p>
          )}
        </div>
        <br/>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-input"
          />
          {formErrors.dateOfBirth && (
            <p className="form-error">{formErrors.dateOfBirth}</p>
          )}
        </div>
        <label>
          Mobile Number:
          <input
            className="form-input"
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number..."
          />
          {formErrors.mobileNumber && (
            <p className="form-error">{formErrors.mobileNumber}</p>
          )}
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="form-input"
          />
          {formErrors.age && <p className="form-error">{formErrors.age}</p>}
        </label>
        <br />
        <label>
          Address:
          <input
            className="form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address..."
          />
          {formErrors.address && (
            <p className="form-error">{formErrors.address}</p>
          )}
        </label>
        <br />
        <label>
          Educational Qualification:
        <input
          type="text"
          name="educationalQualification"
          value={formData.educationalQualification}
          onChange={handleChange}
          placeholder="Educational Qualification"
          className="form-input"
        />
        {formErrors.educationalQualification && <p className="form-error">{formErrors.educationalQualification}</p>}
        </label>
        <br/>
        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
      <div>
        <button onClick={handleShowTable} className="show-table-btn">
          Show Table
        </button>
      </div>

      {showTable && (
        <div className="table-popup">
          <button className="close-btn" onClick={() => setShowTable(false)}>
            Close
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Email Address</th>
                <th>Educational Qualification</th>
                <th>Gender</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {formValues.map((form, index) => (
                <tr key={index}>
                  <td>{form.name}</td>
                  <td>{form.age}</td>
                  <td>{form.mobileNumber}</td>
                  <td>{form.address}</td>
                  <td>{form.emailAddress}</td>
                  <td>{form.educationalQualification}</td>
                  <td>{form.gender}</td>
                  <td>{form.dateOfBirth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormWithPopup;
