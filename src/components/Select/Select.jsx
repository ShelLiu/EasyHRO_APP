/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React, { Component } from 'react';

import validation from '../mixins/form-validation-mixin';


@validation
export default class Select extends Component {

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  render() {
    const {
            options = [],
            placeholder,
            ...attr
          } = this.props;

    return (
      <select {...attr} onBlur={this.onBlur}>
        {
          placeholder ? <option value=''>{placeholder}</option> : null
        }
        {
          options.map(({ text, value, name }, index) => {
            return <option value={name || value} key={index}>{text}</option>;
          })
        }
      </select>
    );
  }
}
