import React from 'react'

const Person = ({persons,search}) => {
  return (
    <div>
        {persons.filter((person) => (
        person.name.toLowerCase().trim().includes(search)
      ))
        .map((person) => (
          <p key={person.id}>{person.name}: {person.number}</p>
        ))}
    </div>
  )
}

export default Person