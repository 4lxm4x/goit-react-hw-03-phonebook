import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({ contacts });
  };
  componentDidUpdate = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  onHandleFilter = input => {
    this.setState({
      filter: input.currentTarget.value.toLowerCase(),
    });
  };

  filterContacts = () => {
    let filteredContacts = [];
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase().includes(this.state.filter)) {
        filteredContacts.push(contact);
      }
    });

    return filteredContacts;
  };

  onHandleFormSubmit = contact => {
    for (let contactInState of this.state.contacts) {
      if (contact.name.toLowerCase() === contactInState.name.toLowerCase()) {
        return alert(`${contact.name} is already in the list.`);
      }
    }

    this.setState(prevState => {
      let contacts = [...prevState.contacts, contact];

      return { contacts };
    });
    // console.log(localStorage.getItem('contacts'));
  };

  deleteContact = e => {
    const deletedContactName = e.target.id;
    let updatedContacts = [];
    for (let contactInState of this.state.contacts) {
      if (
        deletedContactName.toLowerCase() !== contactInState.name.toLowerCase()
      ) {
        updatedContacts.push(contactInState);
      }
    }
    this.setState(() => {
      return { contacts: updatedContacts };
    });
  };
  render() {
    return (
      <div className="mainDiv">
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.onHandleFormSubmit} />
        <h1>Contacts</h1>
        <Filter input={this.onHandleFilter} />
        <Contacts
          contactsList={this.filterContacts()}
          onDelete={this.deleteContact}
        ></Contacts>
      </div>
    );
  }
}

export default App;
