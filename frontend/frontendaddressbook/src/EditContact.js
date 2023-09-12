import React, { useState, useEffect } from 'react';

const errorStyles = {
  color: 'red',
};
function EditContact({ contactId, onEditComplete }) {
  const [name, setName] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(true); 
  const [nameValid, setNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');


  const editApiUrl = `http://localhost:8080/update/${contactId}`;


  useEffect(() => {
    fetch(editApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setName(data.Name);
        setMobileNo(data.Mobileno);
        setEmail(data.Email);
        setAddress(data.Address);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [editApiUrl]);

 
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameValid(nameValue.length <= 20);
    if (nameValue.length > 20) {
      setNameError('Name must have at most 20 characters.');
    } else {
      setNameError('');
    }
  };

  const handleMobileNoChange = (e) => {
    const phoneValue = e.target.value;
    setMobileNo(phoneValue);
    setPhoneValid(/^\d{10}$/.test(phoneValue));
    if (!/^\d{10}$/.test(phoneValue)) {
      setPhoneError('Please enter a valid phone number (up to 10 digits).');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue));
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleEdit = () => {
    if (nameValid && phoneValid && emailValid) {
      const updatedContact = {
        Name: name,
        Mobileno: mobileno,
        Email: email,
        Address: address,
      };
      fetch(editApiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Contact updated successfully');
          setIsOpen(false);
          onEditComplete(); 
        })
        .catch((error) => {
          console.error('Error updating contact:', error);
        });
    } else {
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    onEditComplete();
  };

  return (
    <div>
      {isOpen && (
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
              <div className="error-message" style={errorStyles}>{nameError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={mobileno}
              onChange={handleMobileNoChange}
              required
              className={phoneValid ? '' : 'invalid'}
            />
            {!phoneValid && (
              <div className="error-message" style={errorStyles}>{phoneError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={emailValid ? '' : 'invalid'}
            />
            {!emailValid && (
              <div className="error-message" style={errorStyles}>{emailError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleEdit}>
              Save Changes
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditContact;
