/**
 * Created by AshZhang on 15/10/4.
 */


import React, { Component } from 'react';
import { dispatch } from '../../dispatcher/Dispatcher';

import { getItem as getLang } from '../../common/lang';
import FormControl from '../../components/FormControl/FormControl.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';
import Button from '../../components/Button/Button.jsx';


export default class ForgotStep1 extends Component {

  constructor(props) {
    super(props);
    this.getCaptcha = this.getCaptcha.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.validateNext = this.validateNext.bind(this);
    this.checkCaptcha = this.checkCaptcha.bind(this);
  }

  render() {
    const { captchaTimer, reset } = this.props,
          getCaptchaText = captchaTimer ? `${captchaTimer} ${getLang('RETRY_CAPTCHA')}` : getLang('GET_CAPTCHA'),
          captchaDisabled = !!captchaTimer && !reset;

    return(
      <div className='login-forgot-page'>
        <form ref='captchaForm' className='login-forgot-form'>
          <FormControl label={getLang('COMPANY')} tips={getLang('REQUIRED')}>
            <TextInput ref='companyCode' id='companyCode' name='companyCode'
                       type='text' required
                       onChange={this.validateMobile} />
          </FormControl>

          <FormControl label={getLang('MOBILE')} tips={getLang('REQUIRED')}>
            <TextInput ref='phone' id='phone' name='phone'
                       type='tel' required maxLength='11'
                       onChange={this.validateMobile} />
          </FormControl>

          <FormControl label={getLang('CAPTCHA')} tips={getLang('REQUIRED')}>
            <TextInput id='captcha' name='captcha' required onChange={this.validateNext} />
          </FormControl>

          <Button ref='getCaptcha'
                  className='login-get-captcha' text={getCaptchaText} link
                  disabled={captchaDisabled}
                  onTouchTap={this.getCaptcha} />
        </form>

        <Button ref='next'
                className='login-reset-pwd' text={getLang('NEXT')}
                onTouchTap={this.checkCaptcha} disabled />
      </div>
    );
  }


  /**
   * Check if the phone number is valid
   * so users can send captcha requests
   */
  validateMobile() {
    const phone = React.findDOMNode(this.refs.phone).value,
          companyCode = React.findDOMNode(this.refs.companyCode).value,
          valid = companyCode && phone && phone.length >= 11;

    React.findDOMNode(this.refs.getCaptcha).disabled = !valid;

    return valid;
  }


  /**
   * Get captcha
   */
  getCaptcha() {

    if (this.validateMobile()) {
      dispatch({
        type: 'get-captcha',
        data: {
          phone: React.findDOMNode(this.refs.phone).value,
          companyCode: React.findDOMNode(this.refs.companyCode).value
        }
      });
    }
  }


  /**
   * Check if can go to next step
   * @param e
   */
  validateNext(e) {
    const captcha = e.target.value,
          valid = (this.validateMobile() && captcha && captcha.length);

    React.findDOMNode(this.refs.next).disabled = !valid;

    return valid;
  }


  /**
   * Check captcha before resetting password
   */
  checkCaptcha() {
    dispatch({
      type: 'check-captcha',
      data: new FormData(React.findDOMNode(this.refs.captchaForm))
    });
  }
}