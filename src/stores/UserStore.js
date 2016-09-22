/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import lang from '../common/lang';
import UserDataUtils from '../data-utils/UserDataUtils';


class UserStore extends ReduceStore {

  getInitialState() {
    const userCookie = UserDataUtils.readCookie();

    return {
      loggedIn: userCookie.loggedIn,
      lang: lang.getLang(),
      langList: localStorage.langList ? JSON.parse(localStorage.langList) : [],
      savedLogin: userCookie,
      basicInfo: userCookie,

      // 0 - undefined
      // 1 - employee
      // 2 - manager
      identity: 0,

      menu: {}
    };
  }

  reduce(state, action) {
    action.data || (action.data = {});

    switch (action.type) {
    case 'login-success':
      const data = assign({}, state, {
        loggedIn: true,
        basicInfo: assign(UserDataUtils.readCookie(), action.data.userInfo),
        companyCode: action.data.userInfo.companyCode,
        langList: action.data.lang,
        lang: action.data.lang[0].langCode
      });
      localStorage.mobile = action.data.userInfo.phone;
      if (!action.data.userInfo.userFlag) localStorage.needConfirmMobile = 1;
      if (!action.data.userInfo.userInitFlag) localStorage.needResetPassword = 1;
      localStorage.langList = JSON.stringify(action.data.lang);
      localStorage.companyCode = JSON.stringify(action.data.userInfo.companyCode);
      UserDataUtils.getUserMenu();
      return data;
    case 'login-failed':
    case 'logout-success':
      return assign({}, state, {
        loggedIn: false,
        basicInfo: {}
      });
    case 'toggle-remember':
      UserDataUtils.toggleRemember(action.data);
      return assign({}, state, {
        loggedIn: false,
        basicInfo: {},
        savedLogin: action.data.remember ? action.data : {}
      });
    case 'set-language':
      UserDataUtils.setLang(action.data);
      break;
    case 'set-language-success':
      location.reload();
      return assign({}, state, {
        lang: action.data
      });
    case 'get-user-menu':
      UserDataUtils.getUserMenu();
      break;
    case 'get-user-menu-success':
      const menu = action.data.menu;
      return assign({}, state, action.data, {
        isMrg: menu && menu.ess && menu.ess.length && menu.mss && menu.mss.length
      });
    case 'confirm-mobile-success':
      localStorage.needConfirmMobile = 0;
      return assign({}, state, {
        basicInfo: assign({}, state.basicInfo, {
          userFlag: 1
        })
      });
    case 'init-password-success':
      localStorage.needResetPassword = 0;
      return assign({}, state, {
        basicInfo: assign({}, state.basicInfo, {
          userInitFlag: 1
        })
      });
    default:
    }

    return state;
  }
}


export default new UserStore(Dispatcher);
