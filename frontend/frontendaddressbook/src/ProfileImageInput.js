import React, { useRef } from 'react';

const ProfileImageInput = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={onChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <img
        src="logo.svg"
        alt="Upload Profile"
        onClick={handleIconClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default ProfileImageInput;
