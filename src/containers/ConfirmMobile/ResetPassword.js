/**
 * Created by AshZhang on 16/1/18.
 */


import React, { Component } from 'react';
import { dispatch } from '../../dispatcher/Dispatcher';
import lang, { getItem as getLang } from '../../common/lang';

import Form from '../../components/Form/Form.jsx';

import UserDataUtils from '../../data-utils/UserDataUtils';


const formData = [
  {
    type: 'password',
    id: 'newPwd',
    name: 'newPwd',
    label: getLang('NEW_PWD'),
    tips: getLang('AT_LEAST_6'),
    required: true,
    minLength: 6
  },
  {
    type: 'password',
    id: 'repeatPwd',
    name: 'repeatPwd',
    label: getLang('REPEAT_PWD'),
    tips: getLang('SAME_PWD'),
    required: true,
    minLength: 6
  }
],
resetSubmit = {
  text: getLang('RESET_PWD')
};


export default class ConfirmMobile extends Component {

  confirm() {
    dispatch({
      type: 'init-password-success'
    });
  }


  /**
   * Check password and repeat password are the same
   */
  checkPwd() {
    const pwd = document.getElementById('newPwd').value,
        rpt = document.getElementById('repeatPwd').value;

    if (pwd !== rpt) {
      alert(getLang('SAME_PWD'));
      return false;
    }
  }

  render() {

    return (
        <div className="side-gap" style={{ paddingTop: '2rem' }}>
          <Form className='login-reset-form'
                action='/init-change-password'
                controls={formData}
                submitButton={resetSubmit}
                beforeSubmit={this.checkPwd}
                afterSubmit={this.confirm} />
        </div>
    );
  }
}
