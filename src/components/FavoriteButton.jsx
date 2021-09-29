import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  return (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      <img src={ whiteHeartIcon } alt="share" />
    </button>
  );
}

export default FavoriteButton;
