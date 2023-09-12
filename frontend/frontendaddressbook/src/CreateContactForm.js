import React, { useState } from 'react';

const errorStyles = {
  color: 'red',
};

function CreateContactForm({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [nameValid, setNameValid] = useState(true); // Name validation flag
  const [emailValid, setEmailValid] = useState(true); // Email validation flag
  const [phoneValid, setPhoneValid] = useState(true); // Phone number validation flag

  // Handle changes in the name input field
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);

    // Validate that name has at most 20 characters
    setNameValid(nameValue.length <= 20);
  };

  // Handle changes in the email input field
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Use a regular expression to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailValid(emailPattern.test(emailValue));
  };

  // Handle changes in the phone number input field
  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setMobileNo(phoneValue);

    // Validate that phoneValue is a number and has at most 10 digits
    const phonePattern = /^[0-9]{10}$/;
    setPhoneValid(phonePattern.test(phoneValue));
  };

  const handleSubmit = () => {
    // Check if all validation flags are true before submitting
    if (nameValid && emailValid && phoneValid) {
      const newContact = {
        name,
        email,
        mobileNo,
        address,
      };
      onSubmit(newContact);
      onClose(); // Close the form modal
    } else {
      // Handle form submission errors (e.g., display error message)
    }
  };

  return (
    <div className="form-modal">
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className={nameValid ? '' : 'invalid'}
          />
          {!nameValid && (
            <div className="error-message" style={errorStyles}>
              Name must have at most 20 characters.
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
            className={emailValid ? '' : 'invalid'}
          />
          {!emailValid && (
            <div className="error-message" style={errorStyles}>
              Please enter a valid email address.
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="text"
            value={mobileNo}
            onChange={handlePhoneChange}
            required
            className={phoneValid ? '' : 'invalid'}
          />
          {!phoneValid && (
            <div className="error-message" style={errorStyles}>
              Please enter a valid phone number (up to 10 digits).
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateContactForm;
