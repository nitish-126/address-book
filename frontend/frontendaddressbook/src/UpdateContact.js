import React, { useState, useEffect } from 'react';
import CreateContact from './CreateContact';
import EditContact from './EditContact';
import ProfileImageInput from './ProfileImageInput';

function UpdateContact() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const apiUrl = 'http://localhost:8080/';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const fetchData = () => {
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
  };

  const handleDelete = (Id) => {
    const deleteApiUrl = `http://localhost:8080/delete-id/${Id}`;
    fetch(deleteApiUrl, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedData = data.filter((item) => item.Id !== Id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleEditClick = (Id) => {
    setEditingItemId(Id);
  };

  const handleEditComplete = () => {
    setEditingItemId(null);
  };


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
  };


  return (
    <div>
      <h1>AddressBook</h1>
      <div className="container">
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="create-container">
          <CreateContact />
        </div>
      </div>
      {searchTerm === '' ? (
        <table>
          <thead>
            <tr>
            <th>Profile</th>
              <th>Name</th>
              <th>Mobile No</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.Id}>
                <td>
                  <ProfileImageInput onChange={handleProfileImageChange} />
                </td>
                <td>{item.Name}</td>
                <td>{item.Mobileno}</td>
                <td>{item.Email}</td>
                <td>{item.Address}</td>
                <td>
                  <button onClick={() => handleEditClick(item.Id)}>Edit</button>
                  {editingItemId === item.Id && (
                    <EditContact
                      contactId={item.Id}
                      onEditComplete={handleEditComplete}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(item.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        filteredData.length > 0 ? (
          <ul>
            {filteredData.map((item) => (
              <li key={item.Id}>
                <p>
                  <ProfileImageInput onChange={handleProfileImageChange} />
                </p>
                <p>ID: {item.Id}</p>
                <p>Name: {item.Name}</p>
                <p>Email: {item.Email}</p>
                <p>Mobile No: {item.Mobileno}</p>
                <p>Address: {item.Address}</p>
                <button onClick={() => handleEditClick(item.Id)}>Edit</button>
                {editingItemId === item.Id && (
                  <EditContact
                    contactId={item.Id}
                    onEditComplete={handleEditComplete}
                  />
                )}
                <button onClick={() => handleDelete(item.Id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : null
      )}
    </div>
  );
}

export default UpdateContact;
