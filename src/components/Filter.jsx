import React from 'react'

const Filter = ({search,setSearch}) => {
  return (
    <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
  )
}

export default Filter