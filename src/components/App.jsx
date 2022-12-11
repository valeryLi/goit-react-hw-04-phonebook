import { useLocalStorage } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    const isExist = contacts.find(contact => contact.name === newContact.name);

    if (isExist) {
      return alert(`${newContact.name} is already in contacts`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
      </Section>
      <Section>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={contactsFilter()}
          deleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};

export default App;
