/**
 * Login store
 */


import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import UserDataUtils from '../data-utils/UserDataUtils';


class LoginStore extends ReduceStore {

  getInitialState() {
    return {
      captchaTimer: null,
      reset: null
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'login':
      UserDataUtils.login(action.data);
      break;
    case 'login-fail':
      return assign({}, state, {
        loginStatus: 'failed' + Date.now()
      });
    case 'logout':
      UserDataUtils.logout();
      break;
    case 'get-captcha':
      UserDataUtils.getCaptcha(action.data);
      break;
    case 'get-captcha-countdown':
      return assign({}, state, {
        captchaTimer: action.data,
        reset: false,
        resetPass: false
      });
    case 'get-captcha-fail':
      return assign({}, state, {
        captchaTimer: null,
        reset: true,
        resetPass: false
      });
    case 'check-captcha':
      UserDataUtils.checkCaptcha(action.data);
      break;
    case 'check-captcha-success':
      return assign({}, state, {
        captchaPass: true,
        resetPass: false
      });
    case 'reset-password-success':
      return assign({}, state, {
        resetPass: true
      });
    default:
    }

    return state;
  }
}


export default new LoginStore(Dispatcher);