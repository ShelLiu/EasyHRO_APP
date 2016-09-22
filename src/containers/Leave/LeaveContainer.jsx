/**
 * Leave
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Tab from '../../components/Tab/Tab.jsx';

import LeaveStore from '../../stores/LeaveStore';


class Leave extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const tabSettings = [
      {
        text: getLang('LEAVE_QUOTA'),
        name: 'my-leave/leave-quota',
        icon: 'calendar'
      },
      {
        text: getLang('MY_APPLY'),
        name: 'my-leave/leave-list',
        icon: 'plane'
      },
      {
        text: getLang('LEAVE_SUMMARY'),
        name: 'my-leave/leave-summary',
        icon: 'pie-chart'
      }
    ];

    return (
      <div className='bottom-gap'>
        <Tab items={tabSettings} bottom />

        {this.props.children}
      </div>
    );
  }
}


export default Container.create(Leave);
