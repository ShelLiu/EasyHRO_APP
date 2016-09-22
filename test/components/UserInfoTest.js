/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import UserInfo from '../../src/components/UserInfo/UserInfo.jsx';


describe('User info', () => {
  const data = {
    userInfo: {
      id: 1,
      name: '张阿十',
      avatar: 'default-avatar.png',
      position: '前端设计师'
    },
    action: {
      text: '查看薪资',
      link: '/#/salary/1'
    }
  };

  it('renders a user info area', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserInfo userInfo={data.userInfo} action={data.action}></UserInfo>
    ),
          userInfo = React.findDOMNode(instance);

    expect(userInfo.nodeName).toEqual('SECTION');
    expect(userInfo.classList.contains('user-info')).toBeTruthy();
  });

  it('renders the user\'s avatar', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserInfo userInfo={data.userInfo} action={data.action}></UserInfo>
    ),
          userInfo = React.findDOMNode(instance);

    expect(userInfo.querySelector('.user-info-avatar').style.backgroundImage)
      .toEqual('url(http://' + location.host + '/default-avatar.png)');
  });

  it('renders the user\'s name and position', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserInfo userInfo={data.userInfo} action={data.action}></UserInfo>
    ),
          userInfo = React.findDOMNode(instance);

    expect(userInfo.querySelector('.user-info-name').textContent).toEqual('张阿十');
    expect(userInfo.querySelector('.user-info-pos').textContent).toEqual('前端设计师');
  });

  it('renders the action', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserInfo userInfo={data.userInfo} action={data.action}></UserInfo>
    ),
          userInfo = React.findDOMNode(instance);

    expect(userInfo.querySelector('.user-info-action').textContent).toEqual('查看薪资');
    expect(userInfo.querySelector('.user-info-action').href).toEqual('http://' + location.host + '/#/salary/1');
  });

  it('.onSelectUser(id)', () => {
    const spy = jasmine.createSpy('onSelectUser'),
          instance = ReactTestUtils.renderIntoDocument(
            <UserInfo userInfo={data.userInfo} onSelectUser={spy}></UserInfo>
          ),
          userInfo = React.findDOMNode(instance);

    ReactTestUtils.Simulate.touchTap(userInfo);
    expect(spy.calls.count()).toEqual(1);
  });

  it('simple style', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <UserInfo userInfo={data.userInfo} simple></UserInfo>
    ),
          userInfo = React.findDOMNode(instance);

    expect(userInfo.classList.contains('user-info-simple')).toBeTruthy();
  });
});