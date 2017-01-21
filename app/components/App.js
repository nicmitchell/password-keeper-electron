import React, { Component } from 'react';
import AccountsList from './AccountsList';
import FormFields from '../utils/FormFields';
import DataAdapter from '../utils/DataAdapter';
import shortid from 'shortid';
import styles from './App.css';

class App extends Component {
  constructor() {
    super();
    this.data = new DataAdapter();
    this.state = {
      accounts: {},
      newAccount: {}
      // Example account:
      // {
      //  key: 'aasdfuiop'
      //  account: 'Faceyspace',
      //  email: 'the@thing.com',
      //  password: 'badpass',
      //  username: 'thingy'
      // }
      // 
    };
  }

  componentWillMount = () => {
    const accounts = this.data.getAccounts();
    Object.keys(accounts).forEach((key) => {
      accounts[key].readOnly = true;
      accounts[key].buttonText = 'Edit';
    })
    this.setState({ accounts });
    this.resetNewAccount();
  }

  resetNewAccount = () => {
    const newAccount = FormFields.reduce((acc, field) => {
      return Object.assign(acc, { [field.id]: '' });
    }, {})
    newAccount.key = shortid.generate();
    this.setState({ newAccount });
  }

  addNewAccountToState = (key) => {
    const accounts = { ...this.state.accounts };
    const newAccount = this.state.newAccount;
    accounts[key] = Object.assign(newAccount, { readOnly: true, buttonText: 'Edit' });
    this.setState({ accounts });
    this.saveAccountToStorage(key, newAccount);
    this.resetNewAccount();
  }

  saveNewAccount = (key, account) => {
    const newAccount = this.state.newAccount;
    this.addNewAccountToState(key);
    this.saveAccountToStorage(key, newAccount);
  }

  saveSavedAccount = (key, values) => {
    this.data.set(key, values);
  }

  updateSavedAccount = (key, values) => {
    const accounts = { ...this.state.accounts };
    const previous = accounts[key];
    const updated = {
      ...previous,
      ...values
    }
    accounts[key] = updated;
    this.setState({ accounts }); 
  }

  saveAccountToStorage = (key, values) => {
    const account = this.state.accounts[key] || values;
    this.data.set(key, account);
  }

  updateNewAccount = (key, values) => {
    const previous = this.state.newAccount;
    const updated = {
      ...previous,
      ...values
    }
    this.setState({ newAccount: updated }); 
  }

  render = () => {
    return (
      <div className={ styles.app }>
        <div className={ styles.appHeader }>
          <h2>PassKeeper Thingy</h2>
        </div>
        <AccountsList 
          accounts={ this.state.accounts } 
          updateSavedAccount={ this.updateSavedAccount } 
          saveSavedAccount={ this.saveAccountToStorage }
          newAccountValues={ this.state.newAccount }
          saveNewAccount={ this.saveNewAccount } 
          updateNewAccount={ this.updateNewAccount } 
        />
      </div>
    );
  }
}

export default App;
