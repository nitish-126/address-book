import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateContactForm from './CreateContactForm';

function CreateContact() {
  const [data, setData] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneno, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const apiUrl = 'http://localhost:8080/add-user'; 

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = (contactData) => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Response data:', responseData);
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        closeForm();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app">
      <button className="create-contact-button" onClick={openForm}>
        <FontAwesomeIcon icon={faPlus} />
        Create Contact
      </button>

      {isFormVisible && (
        <CreateContactForm
          onClose={closeForm}
          onSubmit={handleSubmit}
          name={name}
          phoneno={phoneno}
          email={email}
          address={address}
          setName={setName}
          setPhone={setPhone}
          setEmail={setEmail}
          setAddress={setAddress}
        />
      )}
    </div>
  );
}

export default CreateContact;
