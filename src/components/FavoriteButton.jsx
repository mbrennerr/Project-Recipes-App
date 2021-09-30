import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  const [image, setImage] = useState(whiteHeartIcon);

  const handleFavorite = () => {
    if (image === blackHeartIcon) {
      setImage(whiteHeartIcon);
    } if (image === whiteHeartIcon) {
      setImage(blackHeartIcon);
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleFavorite }
    >
      <img src={ image } alt="share" />
    </button>
  );
}

export default FavoriteButton;
