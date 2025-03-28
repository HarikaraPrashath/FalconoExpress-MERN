import React from 'react'

const SearchBar = () => {
  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
    </div>
  )
}

export default SearchBar
