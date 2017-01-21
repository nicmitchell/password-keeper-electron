import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import FormFieldGroup from './FormFieldGroup';
import FormFields from '../utils/FormFields';

class AccountForm extends Component {
  render = () => {
    return (
      <div>
        {
          FormFields.map((field) => {
            return (
              <FormFieldGroup 
                key={ field.id }
                field={ field }
                values={ this.props.values }
                update={ this.props.update }
                showCopyButton={ this.props.showCopyButton }
                readOnly={ this.props.readOnly }
              />
            )
          })
        }
      </div>
    )
  }
}

export default AccountForm;