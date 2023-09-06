import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbar-styled.scss';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleIconClick = () => {
    onSubmit(query);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="search-container">
      <div className="search-icon" onClick={handleIconClick}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="search-input"
          type="text"
          name="query"
          value={query}
          onChange={handleInputChange}
          placeholder="Пошук зображень..."
        />
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
