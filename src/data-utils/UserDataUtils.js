/**
 * User data utils
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax, { ajaxDispatch } from '../common/utils/ajax';
import cookies from '../common/utils/cookies';
import lang from '../common/lang';


export default {

  readCookie() {
    let result = {};

    cookies.keys().forEach((key) => {
      result[key] = cookies.getItem(key);
    });

    return result;
  },


  /**
   * @params {Object} data
   */
  toggleRemember(data) {

    if (data.remember) {
      Object.keys(data).forEach((key) => {
        cookies.setItem(key, data[key]);
      });
    } else {
      Object.keys(data).forEach((key) => {
        cookies.removeItem(key);
      });
    }
  },


  login(data) {
    ajax.post('/login', data)
      .then((res) => {
        cookies.setItem('loggedIn', 1);

        dispatch({
          type: 'login-success',
          data: res
        });
      })
      .catch((e) => {
        dispatch({
          type: 'login-fail',
          data: e
        });
      });
  },

  logout() {
    ajax.get('/logout')
      .then(() => {
        cookies.removeItem('loggedIn');

        dispatch({
          type: 'logout-success'
        });
      })
      .catch((e) => {
        dispatch({
          type: 'logout-fail',
          error: e
        });
      });
  },

  setLang(code) {
    ajax.post('/change-lang', {
      langCode: code
    })
      .then(() => {
        lang.setLang(code);
        dispatch({
          type: 'set-language-success',
          data: code
        });
      });
  },


  // Forgot password
  // ---------------------------

  /**
   * Get captcha for a mobile
   */
  getCaptcha(data) {
    let timer = 61,
        timeout;

    function countDown() {
      timer -= 1;

      dispatch({
        type: 'get-captcha-countdown',
        data: timer
      });

      if (timer === 0) {
        return clearTimeout(timeout);
      }

      timeout = setTimeout(countDown, 1000);
    }

    setTimeout(countDown, 0);

    ajax.post('/validation-no', {
      type: 1,
      companyCode: data.companyCode,
      phone: data.phone,
      captcha: data.captcha
    })
      .catch(() => {
        clearTimeout(timeout);
        dispatch({
          type: 'get-captcha-fail'
        });
      });
  },


  /**
   * Check captcha
   */
  checkCaptcha(formData) {
    ajax.post('/forget-password', formData)
      .then(() => {
        dispatch({
          type: 'check-captcha-success'
        });
      });
  },


  // Home
  // ---------------------------


  /**
   * Get user identity and custom menu
   */
  getUserMenu() {
    ajax.get('/user-menu')
      .then((res) => {
        dispatch({
          type: 'get-user-menu-success',
          data: res
        });
      });
  },


  // Confirm
  // ---------------------------

  confirmMobile() {
    ajaxDispatch({
      action: 'confirm-mobile',
      url: '/user-confirm',
      method: 'get'
    });
  },


  // Init Password
  // ---------------------------

  initPassword() {
    ajaxDispatch({
      action: 'init-password',
      url: '/init-change-password',
      method: 'post'
    });
  }
};
