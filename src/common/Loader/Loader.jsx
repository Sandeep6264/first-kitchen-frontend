import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="global-loader">
      <div className="loader-content">
        <div className="spinner"></div>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;