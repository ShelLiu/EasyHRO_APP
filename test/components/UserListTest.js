/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import UserList from '../../src/components/UserList/UserList.jsx';


describe('User list', () => {
  const users = [
    {
      id: 1,
      name: '张阿十',
      avatar: 'a2e0012df0916596196342a0915d6c5f.png',
      position: '前端设计师'
    },
    {
      id: 2,
      name: '张阿廿',
      avatar: 'a2e0012df0916596196342a0915d6c5f.png',
      position: '前端服务员'
    }
  ];

  it('renders a user list', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserList userList={users}></UserList>
    ),
          userList = React.findDOMNode(instance);

    expect(userList.nodeName).toEqual('DIV');
    expect(userList.classList.contains('user-list')).toBeTruthy();
    expect(userList.querySelectorAll('section').length).toEqual(2);
  });
});