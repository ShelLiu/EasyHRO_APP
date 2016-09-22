/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './textInput.less';

import React, { Component } from 'react';

import validation from '../mixins/form-validation-mixin';
import Icon from '../Icon/Icon.jsx';


@validation
export default class TextInput extends Component {

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
  }

  render() {
    const {
            type = 'text',
            icon,
            ...attrs
          } = this.props;

    let input = <input type={type} {...attrs} onBlur={this.onBlur} />;

    return (
      icon
        ? <div className='text-input-with-icon'>
            <Icon name={icon} className='text-input-icon'></Icon>
            {input}
          </div>
        : input
    );
  }
}