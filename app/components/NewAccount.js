import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import AccountForm from './AccountForm';
import styles from './AccountForm.css';

class NewAccount extends Component {
  update = (key, values) => {
    this.props.updateNewAccount(key, values);
  }

  saveFields = (e) => {
    e.preventDefault();
    this.props.saveNewAccount(this.props.values.key);
  }

  render = () => {
    return (
      <Col md={3}>
      <Form className={ styles.accountCard } ref={ (form) => this.form = form } onSubmit={ (e) => this.saveFields(e) }>
        <AccountForm
          values={ this.props.values } 
          key={ this.props.idx } 
          idx={ this.props.idx } 
          update={ this.update }
          showCopyButton={ false }
          readOnly={ false }
        />
        <Button block bsStyle="primary" type="submit" ref={ (button) => this.button = button }>Save</Button>
      </Form>
      </Col>
    )
  }
}

export default NewAccount;