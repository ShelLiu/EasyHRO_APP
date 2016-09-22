/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './checkbox.less';

import React, { Component } from 'react';

import validation from '../mixins/form-validation-mixin';


@validation
export default class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  render() {
    const { placeholder, ...attrs } = this.props;

    return (
      <label className='checkbox'>
        <input type='checkbox' {...attrs} onBlur={this.onBlur} />
        <span className='checkbox-text'>{placeholder}</span>
      </label>
    );
  }
}