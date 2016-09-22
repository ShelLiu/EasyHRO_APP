/**
 * Overtime
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Tab from '../../components/Tab/Tab.jsx';

import OvertimeStore from '../../stores/OvertimeStore';


const tabSettings = [
  {
    text: getLang('MY_APPLY'),
    name: 'my-ot/list',
    icon: 'clock-o'
  },
  {
    text: getLang('OT_SUMMARY'),
    name: 'my-ot/summary',
    icon: 'pie-chart'
  }
];


class Overtime extends Component {

  static getStores() {
    return [OvertimeStore];
  }

  static calculateState() {
    return OvertimeStore.getState();
  }


  render() {
    return (
      <div className='bottom-gap'>
        {this.props.children}

        <Tab items={tabSettings} bottom />
      </div>
    );
  }
}


export default Container.create(Overtime);
