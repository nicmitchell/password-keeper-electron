import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

class FormFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyState: null,
      copyText: 'Copy'
    }
  }

  select = (e) => {
    e.target.select();
  }

  copy = (e, input) => {
    input.select();
    try {
      document.execCommand('copy');
      this.copySuccess(e.target, input.value);
    } catch (err) {
      this.copyError(err);
      window.alert('Error trying to copy to clipboard');
    }
  }

  copySuccess = (copyButton, value) => {
    console.log('Copied to clipboard:', value);
    this.setState({
      copyText: 'Copied',
      copyState: 'success'
    });
    this.resetCopyButton();
  }

  copyError = (e) => {
    console.log('Error copying to clipboard:', e);
    this.setState({ 
      copyText: 'Error',
      copyState: 'error'
    });
    this.resetCopyButton();
  }

  resetCopyButton = () => {
    window.setTimeout(() => {
      this.setState({
        copyText: 'Copy',
        copyState: null
      });
    }, 2000);
  }

  update = (e) => {
    const value = e.target.value;
    const input = e.target.id;
    const key = this.props.values.key;
    this.props.update(key, { [input]: value });
  }

  render = () => {
    const name = this.props.field.id;
    return (
      <FormGroup validationState={ this.state.copyState } key={ `${this.props.values.key}-${name}` }>
        <InputGroup bsSize="small">
          <FormControl
            inputRef={ (ref) => this[name] = ref } 
            value={ this.props.values[name] } 
            onClick={ (e) => this.select(e) }
            onChange={ (e) => this.update(e) }
            readOnly={ this.props.readOnly }
            { ...this.props.field }
          />
          <InputGroup.Addon onClick={ (e) => this.copy(e, this[name]) } ref={ (button) => this.copyButton = button }>{ this.state.copyText }</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    )
  }
}

export default FormFieldGroup;
