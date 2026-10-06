import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    if (newName.trim() === "") alert("Name cannot be empty")
    else if (persons.some((person) => person.name.toLowerCase().trim() === newName.toLowerCase().trim())) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    else {
      setPersons((prev) => [...prev, { name: newName, number: newNumber, id: Date.now() }])
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Person  search={search} persons={persons}/>
    </div>
  )
}

export default App