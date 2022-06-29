import React, { ChangeEvent } from 'react'

interface searchBarProps {
  term: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<searchBarProps> = ({ term, onChange }) => {
  return (
    <div className="ui transparent input">
      <input
        type="text"
        placeholder="Music Search"
        value={term}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
