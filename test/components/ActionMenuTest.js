/**
 * Created by AshZhang on 15/9/26.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ActionMenu from '../../src/components/ActionMenu/ActionMenu.jsx';


describe('ActionMenu', () => {
  const items = [
    {
      text: '我的信息',
      style: 1,
      icon: 'user',
      link: 'profile',
      notification: 1
    },
    {
      text: '我的薪资',
      style: 2,
      icon: 'money',
      link: 'my-salary'
    }
  ];

  it('renders an action menu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <ActionMenu items={items}></ActionMenu>
          ),
          actionMenu = React.findDOMNode(instance),
          menuItems = actionMenu.querySelectorAll('a');

    expect(actionMenu.nodeName).toEqual('NAV');
    expect(menuItems.length).toEqual(2);

    expect(menuItems[0].classList.contains('action-menu-style-1')).toBeTruthy();
    expect(menuItems[0].querySelector('.action-menu-text').textContent).toEqual('我的信息');
    expect(menuItems[0].href).toEqual(document.baseURI + '#/profile');
    expect(menuItems[0].querySelector('.action-menu-icon').classList.contains('fa-user')).toBeTruthy();

    expect(menuItems[1].classList.contains('action-menu-style-2')).toBeTruthy();
    expect(menuItems[1].querySelector('.action-menu-text').textContent).toEqual('我的薪资');
    expect(menuItems[1].href).toEqual(document.baseURI + '#/my-salary');
    expect(menuItems[1].querySelector('.action-menu-icon').classList.contains('fa-money')).toBeTruthy();
  });

  it('renders menu notifications', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <ActionMenu items={items}></ActionMenu>
          ),
          actionMenu = React.findDOMNode(instance),
          notification = actionMenu.querySelector('.action-menu-label');

    expect(notification).not.toBeNull();
    expect(notification.textContent).toEqual('1');
  });
});