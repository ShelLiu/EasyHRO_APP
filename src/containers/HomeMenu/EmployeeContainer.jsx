/**
 * Employee Container
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import assign from 'object-assign';

import menuSettings from './homeMenuSettings';
import ActionMenu from '../../components/ActionMenu/ActionMenu.jsx';
import UserStore from '../../stores/UserStore';


class Employee extends Component {

  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    const empMenu = UserStore.getState().menu.ess || [];

    return {
      menu:  empMenu.map((item) => {
        return assign(item, menuSettings[item.name]);
      })
    };
  }

  render() {
    return (
      <ActionMenu items={this.state.menu}></ActionMenu>
    );
  }
}


export default Container.create(Employee);
