/**
 * Created by AshZhang on 15/9/29.
 */


import './form.less';

import React, { Component } from 'react';

import ajax from '../../common/utils/ajax';
import Button from '../Button/Button.jsx';
import TextInput from '../TextInput/TextInput.jsx';
import Select from '../Select/Select.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import FormControl from '../FormControl/FormControl.jsx';


export default class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      disabled: true,
      submitting: false
    };
  }

  render() {
    const { submitButton, controls = [], onSubmit, ...attrs } = this.props,
          controlElems = controls.map((control, index) => {
            let Control;

            if (!control.id) {
              control.id = control.name;
            }

            switch (control.type) {
            case 'hidden':
            case 'text':
            case 'tel':
            case 'password':
            case 'date':
            case 'datetime-local':
            case 'file':
              Control = TextInput;
              break;
            case 'select':
              Control = Select;
              if (control.options && control.options[0] && control.options[0].text) {
                control.options.unshift({
                  value: '',
                  text: ''
                });
              }
              break;
            case 'checkbox':
              Control = Checkbox;
              break;
            }

            return (
              <FormControl key={index} {...control}>
                <Control {...control} ref={control.id || control.name} onChange={this.isValid} />
              </FormControl>
            );
          });

    return (
      <form {...attrs} onSubmit={this.onSubmit} noValidate>
        {controlElems}
        <div className='form-submit'>
          {submitButton && <Button type='submit' {...submitButton}
                  disabled={this.state.disabled}
                  submitting={this.state.submitting} />}
        </div>
      </form>
    );
  }


  /**
   * Test if the form is valid
   * @returns {boolean}
   */
  isValid() {
    let valid = true;

    Object.keys(this.refs).forEach((refName) => {
      valid = this.refs[refName].isValid() && valid;
    });

    this.setState({
      disabled: !valid
    });

    return valid;
  }


  /**
   * Submit the form only if it's valid
   * @param e
   */
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({
        disabled: true,
        submitting: true
      });

      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit.call(this, e);
      } else {
        const formData = new FormData(React.findDOMNode(this));
        let beforeResult = null;

        // If `.beforeSubmit()` returns false, don't post the form
        if (typeof this.props.beforeSubmit === 'function') {
          beforeResult = this.props.beforeSubmit.call(this);

          if (beforeResult === false) {
            return this.setState({
              disabled: false,
              submitting: false
            });
          }
        }

        // .afterSubmit(res)
        ajax.post(this.props.action, formData)
          .then((res) => {
            this.setState({
              disabled: false,
              submitting: false
            });

            if (typeof this.props.afterSubmit === 'function') {
              this.props.afterSubmit.call(this, res);
            }
          })
          .catch((e) => {
            this.setState({
              disabled: false,
              submitting: false
            });
          });
      }
    }
  }
}
