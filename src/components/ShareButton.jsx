import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setLoadMessage }) {
  const { pathname } = useLocation();
  const { href } = window.location;
  let copyLink;

  if (pathname.includes('in-progress')) {
    const [link] = href.split('/in-progress');
    copyLink = link;
  } else {
    copyLink = href;
  }

  const shareRecipe = () => {
    setLoadMessage(true);
    copy(copyLink);
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

ShareButton.propTypes = {
  setLoadMessage: PropTypes.func,
}.isRequired;

export default ShareButton;
