import { useState, useEffect } from 'react';

import personsService from './services/persons';

const Persons = ({
  personsToShow,
  persons,
  setPersons,
  setFilteredPersons,
  setNotificationMessage,
  setMessageIsError,
}) => {
  function deletePerson(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .delete(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setFilteredPersons(persons.filter((p) => p.id !== person.id));
          setMessageIsError(false);
          setNotificationMessage(`Person ${person.name} deleted succesfully.`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessageIsError(true);
          setNotificationMessage(
            `The information of ${person.name} has already been removed from the server.`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        });
    }
  }

  return (
    <div>
      {personsToShow.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

const PersonForm = ({
  persons,
  setPersons,
  setFilteredPersons,
  setNotificationMessage,
  setMessageIsError,
}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find(
      (item) => item.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(personExists.id, personObject)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === personExists.id ? response : person
            );
            setMessageIsError(false);
            setNotificationMessage(`Person ${newName} updated succesfully.`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);

            setPersons(updatedPersons);
            setFilteredPersons(updatedPersons);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            console.log(error);
            setMessageIsError(true);
            setNotificationMessage(error);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);
          });
        event.preventDefault();
      }
    } else {
      event.preventDefault();

      personsService
        .create(personObject)
        .then((response) => {
          setMessageIsError(false);
          setNotificationMessage(`Person ${newName} added succesfully.`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);

          // Updating the persons storaged in the browser so that the newly added person shows aswell
          //  (Also getting the auto-generated id for the added person that json-server made automatically.)
          const updatedPersons = [...persons, response];
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          setMessageIsError(true);
          setNotificationMessage(error);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ persons, setFilteredPersons }) => {
  const [filter, setFilter] = useState('');

  const handleShowChange = (event) => {
    setFilter(event.target.value);
    const filtered =
      event.target.value.trim() === ''
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(event.target.value.toLowerCase())
          );
    setFilteredPersons(filtered);
  };

  return (
    <div>
      Filter shown with <input value={filter} onChange={handleShowChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setFilteredPersons] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [messageIsError, setMessageIsError] = useState();

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        messageIsError={messageIsError}
      />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setNotificationMessage={setNotificationMessage}
        setMessageIsError={setMessageIsError}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        persons={persons}
        setFilteredPersons={setFilteredPersons}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setMessageIsError={setMessageIsError}
      />
    </div>
  );
};

const Notification = ({ message, messageIsError }) => {
  if (message === null) {
    return null;
  }
  if (messageIsError) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="notification">{message}</div>;
  }
};

export default App;
