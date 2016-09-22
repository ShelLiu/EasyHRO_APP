/**
 * Created by AshZhang on 15/10/13.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SideNav from '../../src/components/SideNav/SideNav.jsx';


describe('SideNav', () => {
  const sideNavData = [
    {
      text: '修改手机',
      link: 'change-mobile'
    },
    {
      text: '修改密码',
      link: 'change-password'
    }
  ];

  it('renders a side nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <SideNav data={sideNavData}></SideNav>
          ),
          sideNav = React.findDOMNode(instance),
          items = sideNav.querySelectorAll('.side-nav-item');

    expect(sideNav.nodeName).toEqual('DIV');
    expect(sideNav.querySelector('.side-nav')).not.toBeNull();
    expect(items.length).toEqual(2);
    expect(items[0].textContent).toEqual(sideNavData[0].text);
    expect(items[0].href).toEqual(document.baseURI + '#/' + sideNavData[0].link);
    expect(items[1].textContent).toEqual(sideNavData[1].text);
    expect(items[1].href).toEqual(document.baseURI + '#/' + sideNavData[1].link);
  });

  it('.onClick()', () => {
    const spy = jasmine.createSpy(),
          sideNavData = [
            {
              text: '修改手机',
              onTouchTap: spy
            }
          ],
          instance = ReactTestUtils.renderIntoDocument(
            <SideNav data={sideNavData}></SideNav>
          ),
          sideNav = React.findDOMNode(instance),
          item = sideNav.querySelector('.side-nav-item');

    expect(spy.calls.count()).toEqual(0);
    ReactTestUtils.Simulate.click(item);
    expect(spy.calls.count()).toEqual(1);
    expect(item.href).toEqual('');
  });

  it('.open()', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <SideNav data={sideNavData}></SideNav>
          ),
          sideNav = React.findDOMNode(instance).querySelector('.side-nav');

    expect(sideNav.classList.contains('opened')).toBeFalsy();
    instance.open();
    expect(sideNav.classList.contains('opened')).toBeTruthy();
    expect(document.body.classList.contains('side-nav-opened')).toBeTruthy();
  });

  it('.close()', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <SideNav data={sideNavData}></SideNav>
          ),
          sideNav = React.findDOMNode(instance).querySelector('.side-nav');

    instance.open();
    instance.close();

    //expect(sideNav.classList.contains('opened')).toBeFalsy();
    //expect(document.body.classList.contains('side-nav-opened')).toBeFalsy();
  });
});