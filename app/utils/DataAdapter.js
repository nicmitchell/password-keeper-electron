import sampleData from './sample-data.js';
// import localforage from 'localforage';

class DataAdapter {
  constructor() {
    this.data = {};
  }

  exportToLocalStorage = (data) => {
    Object.keys(data).forEach((account) => {
      localStorage.setItem(account, JSON.stringify(data[account]));
    })
  }

  isValidEntry = (key) => {
    let valid = true;
    try {
      JSON.parse(localStorage[key]);
    } catch(e) {
      valid = false;
    }
    return (valid && localStorage[key] !== "{}");
  }

  loadFromLocalStorage = () => {
    Object.keys(localStorage).forEach((key) => {
      if(this.isValidEntry(key)) {
        const account = JSON.parse(localStorage.getItem(key));
        this.data[key] = account;
      } else {
        localStorage.removeItem(key);
      }
    });
  }

  getAccounts = () => {
    if (!localStorage.length) {
      this.exportToLocalStorage(sampleData);
    }
    this.loadFromLocalStorage();
    return this.data;
  }

  set = (key, data) => {
    return localStorage.setItem(key.toString(), JSON.stringify(data));
  }

  get = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default DataAdapter;