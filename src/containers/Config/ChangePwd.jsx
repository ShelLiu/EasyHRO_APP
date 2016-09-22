/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import ajax, { ajaxDispatch } from '../../common/utils/ajax';

import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';


const changePwdControls = [
  {
    type: 'tel',
    id: 'mobile',
    name: 'mobile',
    label: getLang('MOBILE'),
    minLength: 11,
    maxLength: 11,
    required: true,
    tips: getLang('MOBILE_TIP')
  },
  {
    type: 'tel',
    id: 'captcha',
    name: 'captcha',
    label: getLang('CAPTCHA'),
    minLength: 6,
    maxLength: 6,
    required: true,
    tips: getLang('REQUIRED')
  },
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
];

const submitButton = {
  text: getLang('CHANGE_PWD')
};

export default class ChangePwd extends Component {

  constructor(props) {
    super(props);
    this.getCaptcha = this.getCaptcha.bind(this);
    this.state = {
      captchaTimer: 0
    };
  }

  render() {
    const { captchaTimer } = this.state,
        getCaptchaText = captchaTimer ? `${captchaTimer} ${getLang('RETRY_CAPTCHA')}` : getLang('GET_CAPTCHA'),
        captchaDisabled = !!captchaTimer;

    return (
      <div>
        <Header back title={getLang('CHANGE_PWD')} />
        <Form action='/change-password'
              controls={changePwdControls}
              submitButton={submitButton}
              className='side-gap gap-t-lg'
              beforeSubmit={this.checkPwd}
              afterSubmit={this.getResult}></Form>

        <Button ref='getCaptcha'
                className='login-get-captcha'
                style={{ bottom: 'auto', top: '10.75rem' }}
                text={getCaptchaText} link
                disabled={captchaDisabled}
                onTouchTap={this.getCaptcha} />
      </div>
    );
  }


  getCaptcha() {
    let timer = 61,
        timeout,
        mobile = document.getElementById('mobile').value,
        self = this;

    if (!(/^\d{11}$/.test(mobile))) return;

    function countDown() {
      timer -= 1;

      self.setState({
        captchaTimer: timer
      });

      if (timer === 0) {
        return clearTimeout(timeout);
      }

      timeout = setTimeout(countDown, 1000);
    }

    setTimeout(countDown, 0);

    ajax.post('/validation-no', {
      type: 1,
      phone: mobile
    })
        .catch(() => {
          clearTimeout(timeout);
          self.setState({
            captchaTime: 0
          });
        });
  }


  /**
   * Check password and repeat password are the same
   */
  checkPwd() {
    if (document.getElementById('newPwd').value !== document.getElementById('repeatPwd').value) {
      alert(getLang('SAME_PWD'));
      return false;
    }
  }


  /**
   * Get change mobile result
   */
  getResult() {
    alert(getLang('EDIT_SUCCESS'));
    history.back();
  }
}