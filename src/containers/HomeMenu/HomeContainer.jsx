/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { dispatch } from '../../dispatcher/Dispatcher';

import lang, { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';
import SideNav from '../../components/SideNav/SideNav.jsx';
import LoginContainer from '../Login/LoginContainer.jsx';
import ConfirmMobile from '../ConfirmMobile/ConfirmMobile';
import ResetPassword from '../ConfirmMobile/ResetPassword';
import UserStore from '../../stores/UserStore';


const sideNavData = [
  {
    text: getLang('CHANGE_MOBILE'),
    link: 'change-mobile'
  },
  {
    text: getLang('CHANGE_PWD'),
    link: 'change-password'
  },
  {
    text: getLang('LOGOUT')
  }
];

const langDropdown = {
  items: [
    {
      text: '中文',
      name: 'pla_lan_001'
    },
    {
      text: 'English',
      name: 'pla_lan_002'
    },
    {
      text: '日本語',
      name: 'pla_lan_003'
    }
  ],
  onClickItem(langCode) {
    dispatch({
      type: 'set-language',
      data: langCode
    });
  }
};

const tabItems = [
  {
    text: getLang('EMPLOYEE'),
    name: 'employee'
  },
  {
    text: getLang('MANAGER'),
    name: 'manager'
  }
];


class Home extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.openSideNav = this.openSideNav.bind(this);

    sideNavData[2].onTouchTap = this.logout;
  }

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    return UserStore.getState();
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.getUserMenu();
    }
  }

  render() {
    const { loggedIn, menu, picInfo, langList, basicInfo } = this.state,
      routeName = this.props.location.pathname,
      hasHeader = ['/employee', '/manager', '/'].indexOf(routeName) > -1,
      needConfirmMobile = +localStorage.needConfirmMobile,
      needResetPassword = +localStorage.needResetPassword;

    Object.keys(menu).forEach((userType, index) => {
      tabItems[index].notification = menu[userType].some((item) => {
          return item.notification;
        });
    });

    langDropdown.items = langList.map((item) => {
      return {
        name: item.langCode,
        text: item.langName
      };
    });

    const pic = picInfo
      ? <div style={{
            background: 'rgba(0, 0, 0, 0.03)',
            paddingBottom: '1rem',
            paddingTop: '1rem',
            textAlign: 'center'
        }}>
          <img src={picInfo.url} alt="" style={{
            borderRadius: '50%',
            height: '5rem',
            width: '5rem'
          }} />
          <div>
            <span>{picInfo.name}</span>
            <div className="text-lighter text-sm gap-l">{picInfo.position}</div>
          </div>
        </div>
      : null;

    return (
      !loggedIn
        ? <LoginContainer />
        : needConfirmMobile
          ? <ConfirmMobile {...basicInfo} />
          : needResetPassword
              ? <ResetPassword></ResetPassword>
              : <div>
                  {
                    hasHeader
                      ? <div>
                          <Header
                              title='CDP Portal'
                              dropdown={langDropdown}
                              iconLeft='cdp-line'
                              onTapLeft={this.openSideNav} />
                          {pic}
                        </div>
                      : null
                  }
                  {
                    hasHeader
                      ? <SideNav ref='sideNav' data={sideNavData}></SideNav>
                      : null
                  }
                  {
                    (hasHeader && menu.mss && menu.ess)
                      ? <Tab items={tabItems}></Tab>
                      : null
                  }
                  {this.props.children}
                </div>
    );
  }


  openSideNav() {
    setTimeout(() => {
      this.refs.sideNav.open();
    }, 0);
  }


  /**
   * Get custimzed menu list
   */
  getUserMenu() {
    dispatch({
      type: 'get-user-menu'
    });
  }


  /**
   * Logout
   */
  logout() {
    dispatch({
      type: 'logout'
    });
  }
}


export default Container.create(Home);
