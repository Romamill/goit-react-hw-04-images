import React, { useEffect } from 'react';
import './modal-styled.scss';
import PropTypes from 'prop-types';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='modal-overlay' onClick={handleClickOutside}>
      <div className='modal-content'>
        <img className='modal-image' src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
