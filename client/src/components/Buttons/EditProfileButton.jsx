import React from 'react';
import './buttons.css';

const EditProfileButton = () => {
  return (
    <a 
      href="/accounts/edit"
      className="btn btn-light btn-sm btn-edit-profile"
    >
      Edit Profile
    </a>
  );
}

export default EditProfileButton;
