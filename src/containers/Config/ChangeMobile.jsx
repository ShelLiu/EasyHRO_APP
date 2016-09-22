/**
 * Created by AshZhang on 15/10/14.
 */


import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import ajax, { ajaxDispatch } from '../../common/utils/ajax';

import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';
import Button from '../../components/Button/Button.jsx';


const changeMobileControls = [
  {
    type: 'password',
    id: 'password',
    name: 'password',
    label: getLang('PASSWORD'),
    required: true
  },
  {
    type: 'tel',
    id: 'mobile',
    name: 'mobile',
    label: getLang('NEW_MOBILE'),
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
  }
];

const submitButton = {
  text: getLang('CHANGE_MOBILE')
};

export default class ChangeMobile extends Component {

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

    if (localStorage.mobile) {
      changeMobileControls[1].defaultValue = localStorage.mobile;
    }

    return (
      <div style={{ position: 'relative' }}>
        <Header back title={getLang('CHANGE_MOBILE')} />
        <Form action='/change-mobile'
              controls={changeMobileControls}
              submitButton={submitButton}
              className='side-gap gap-t-lg'
              afterSubmit={this.getResult}></Form>

        <Button ref='getCaptcha'
                className='login-get-captcha'
                style={{ bottom: 'auto', top: '15.75rem' }}
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
      type: 0,
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
   * Get change mobile result
   */
  getResult() {
    localStorage.needConfirmMobile = 0;
    localStorage.mobile = document.getElementById('mobile').value;
    alert(getLang('EDIT_SUCCESS'));

    if (location.hash.indexOf('change-mobile') > -1) {
      history.back();
    } else {
      location.reload();
    }
  }
}
