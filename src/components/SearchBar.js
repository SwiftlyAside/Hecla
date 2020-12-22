import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    onFormSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <label>Music Search</label>
          <input
            type="text"
            value={term}
            onChange={event => setTerm(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
