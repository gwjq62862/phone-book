import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import axios from 'axios'
import Toast from './components/Toast'

const App = () => {
  const [persons, setPersons] = useState([

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [updateId, setUpdateId] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const startUpdate = (person) => {
    setNewName(person.name)
    setNewNumber(person.number)
    setUpdateId(person.id)
  }

  const showNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = axios.get('http://localhost:3001/persons', {
          method: "GET"
        })
        const data = (await response).data
        setPersons(data)
      } catch (error) {
        console.log('error in data fetching', error)
      }
    }
    fetchData()
  }, [persons])


  const addOrUpdatePerson = async (e) => {
    e.preventDefault()
    if (newName.trim() === "") {
      alert("Name cannot be empty")
      return
    }


    if (updateId !== null) {
      try {
        const updatedPerson = { name: newName, number: newNumber }
        const response = await axios.put(`http://localhost:3001/persons/${updateId}`, updatedPerson)

        setPersons(persons.map(p => p.id !== updateId ? p : response.data))
        setNewName('')
        setNewNumber('')
        setUpdateId(null)
        showNotification(`Successfully updated ${newName}`)

      } catch (error) {
        showNotification(`Information of ${newName} has already been removed from server`, 'error')
        console.log('update error', error)
      }
      return
    }


    const existingPerson = persons.find(
      (person) => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if (existingPerson) {
      showNotification(`${newName} is already added to phonebook`, "error")
    } else {
      try {
        const data = { name: newName, number: newNumber }
        const response = await axios.post('http://localhost:3001/persons', data)
        setPersons((prev) => [...prev, response.data])
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`)

      } catch (error) {
        showNotification('Data posting has an error', 'error')
        console.log('data posting has an error', error)
      }
    }
  }

  const deletePhoneBook = async (id) => {

    try {
      axios.delete(`http://localhost:3001/persons/${id}`,)
      setPersons(persons.filter((person) => person.id !== id))
      showNotification(`Deleted ${name}`)
    } catch (error) {
      showNotification(`Information of ${name} has already been removed from server`, 'error')
      console.log('deleting got an error')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Toast message={notification} type={notificationType} />}
      <Filter search={search} setSearch={setSearch} />
      <PersonForm
        addPerson={addOrUpdatePerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Person search={search} persons={persons} deletePhoneBook={deletePhoneBook} startUpdate={startUpdate} />
    </div>
  )
}

export default App