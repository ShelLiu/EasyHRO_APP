/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import React from 'react';


function getInput(node) {
  const inputTypes = ['INPUT', 'SELECT', 'TEXTAREA'];

  if (inputTypes.indexOf(node.nodeName) > -1) {
    return node;
  } else {
    return node.querySelector('input, select, textarea');
  }
}


export default function (target) {


  /**
   * Validate the control
   * @returns {boolean}
   */
  target.prototype.isValid = function () {
    const input = getInput(React.findDOMNode(this));
    let valid = true;

    if (!input) return valid;

    const value = input.value;

    if (this.props.required && !value) {
      valid = false;
    }

    if (value) {
      if (this.props.maxLength && value.length > this.props.maxLength) {
        valid = false;
      }

      if (this.props.minLength && value.length < this.props.minLength) {
        valid = false;
      }

      if (this.props.max && +value > +this.props.max) {
        valid = false;
      }

      if (this.props.min && +value < +this.props.min) {
        valid = false;
      }
    }

    // Triggers `onValid` and `onInvalid`
    if (valid) {
      if (typeof this.props.onValid === 'function') {
        this.props.onValid.call(this, value);
      }
    } else {
      if (typeof this.props.onInvalid === 'function') {
        this.props.onInvalid.call(this, value);
      }
    }

    return valid;
  };


  /**
   * Validate on blur
   */
  target.prototype.onBlur = function (e) {
    this.isValid();

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur.call(this, e);
    }
  };
}