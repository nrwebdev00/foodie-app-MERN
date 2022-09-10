import React, { useState } from 'react'

function SearchBar() {
  const [ search, setSearch ] = useState('');

  return (
    <form action="#" className="form-search">
          <input
            type="text"
            name="search"
            aria-label='Search Recipe App'
            value={search}
            className="form-input form-input-search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="submit"
            value='Search'
            className="form-search-btn btn raise-up-hover-effect"
          />
        </form>
  )
}

export default SearchBar