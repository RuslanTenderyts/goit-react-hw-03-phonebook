import { Component } from "react";

import {ContactFormik} from "./ContactForm/ContactFormik";
import ContactList from "./ContactList/ContactList.js";
import Filter from "./Filter/Filter"
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./Layout";



export class App extends Component {
  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsetContacts = JSON.parse(contacts);

    if(parsetContacts) {
      this.setState({contacts: parsetContacts});
    }
    
  };
  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  };

  handleFilterChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
 
  isNameInContacts = (name) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const contactsName = contacts.map(contact => contact.name.toLowerCase());
    
    return contactsName.includes(normalizedName)
  }

  handlerSubmitForm = (newContact) => {

    if(this.isNameInContacts(newContact.name)) {
      return alert(`${newContact.name} is already in contacts`)
    }

    this.setState(prevState => ({
        contacts: [ newContact, ...prevState.contacts ],
      })
    );
  }
  
  getVisibleContacts = () => {
    const {filter, contacts} = this.state
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  

  render() {
    const {filter} = this.state;
    const visibleContacts = this.getVisibleContacts();


    return (
  
      <Layout> 
        <h1> PhoneBook </h1>
        <ContactFormik onSubmit={this.handlerSubmitForm} />
        <h2> Contacts </h2>
        <Filter 
          value={filter} 
          onChange={this.handleFilterChange} />
        <ContactList 
          contacts = {visibleContacts} 
          onDeleteContact = {this.onDeleteContact} />

        <GlobalStyle />
      </Layout>
    );
  };
};

