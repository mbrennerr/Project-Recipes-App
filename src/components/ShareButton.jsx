import React from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setLoadMessage }) {
  const shareRecipe = () => {
    setLoadMessage(true);
    // console.log(window.location.host + window.location.pathname);
    // const link = 'http://localhost:3000/';
    copy(window.location.href);
    const TIME = 2000;
    setTimeout(() => {
      setLoadMessage(false);
    }, TIME);
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ shareRecipe }
    >
      <img src={ shareIcon } alt="share" />
    </button>
  );
}

export default ShareButton;
