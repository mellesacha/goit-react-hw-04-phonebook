import { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { Container, Title } from "./App.styled";

export class App extends Component {

  state = {
   contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }

  componentDidMount() {

    const listContact = localStorage.getItem("Contacts");
    const parseListContact = JSON.parse(listContact);
    localStorage.length && this.setState({contacts : parseListContact})
    
  }

  componentDidUpdate() {
    const {contacts} = this.state;
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }

  onAddContact = (contact) => {
    const newContact = {
      ...contact,
      id: nanoid()
    }

    this.state.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
          ? (alert(`${newContact.name} is already in contacts`))
      : this.setState(prevState => { return { contacts: [{ ...newContact }, ...prevState.contacts] } }) 
  
    // this.setState(prevState => 
    //   this.state.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
    //       ? (alert(`${newContact.name} is already in contacts`))
    //       : { contacts: [{ ...newContact }, ...prevState.contacts] }
    // )

  }

  deleteContact = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      };
    });
  };

  handlInputFilter = (e) => {
    this.setState({ filter: e.target.value })
  }


  render()
  {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );

    return (
 <Container>
  <Title>Phonebook</Title>
        <ContactForm addContact={this.onAddContact } />

  <Title>Contacts</Title>
        <Filter search={filter}  handlInput={this.handlInputFilter}/>
        <ContactList contacts={filteredContacts} onDeleteContact={ this.deleteContact} />
</Container>
    )
  
   
  }
};
