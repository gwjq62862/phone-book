import React from 'react'

const Person = ({ persons, search, deletePhoneBook,startUpdate }) => {
  return (
    <div>
      {persons.filter((person) => (
        person.name.toLowerCase().trim().includes(search)
      ))
        .map((person) => (
          <div key={person.id}>
            <p >{person.name}: {person.number}</p>
            <button onClick={() => deletePhoneBook(person.id)}>delete</button>
  <button onClick={() => startUpdate(person)}>update</button>
          </div>

        ))}
    </div>
  )
}

export default Person