import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header() {
  return (
    <div className="header">
      <Link to="/perfil" data-testId="profile-top-btn"><img src={ profileIcon } alt="profile" /></Link>
      <h3 data-testId="page-title">Place holder</h3>
      <button data-testId="search-top-btn"><img src={ searchIcon } alt="" /></button>
    </div>
  );
}

export default Header;
