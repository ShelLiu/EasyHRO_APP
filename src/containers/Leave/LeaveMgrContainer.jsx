/**
 * Home page
 */


import './leave-mgr.less';

import React, { Component } from 'react';

import { getItem as getLang } from '../../common/lang';
import Tab from '../../components/Tab/Tab.jsx';


const tabSettings = [
  {
    text: getLang('LEAVE_QUOTA'),
    name: 'leave-mgr/quota',
    icon: 'calendar'
  },
  {
    text: getLang('PENDING'),
    name: 'leave-mgr/pending',
    icon: 'plane'
  },
  {
    text: getLang('HISTORY'),
    name: 'leave-mgr/history',
    icon: 'book'
  },
  {
    text: getLang('LEAVE_SUMMARY'),
    name: 'leave-mgr/summary',
    icon: 'pie-chart'
  }
];


class LeaveMgr extends Component {

  render() {
    return (
      <div className='bottom-gap'>
        <Tab items={tabSettings} bottom></Tab>

        {this.props.children}
      </div>
    );
  }
}


export default LeaveMgr;
