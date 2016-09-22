/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Tab from '../../src/components/Tab/Tab.jsx';


describe('Tab', () => {
  const tabItems = [
    {
      text: '兑礼信息',
      name: 'gift',
      icon: 'icon',
      notification: true,
      active: true
    },
    {
      text: '收货地址',
      name: 'address',
      icon: 'icon'
    }
  ];

  it('renders a tab with items', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Tab items={tabItems}></Tab>
          ),
          tab = React.findDOMNode(instance),
          items = tab.querySelectorAll('a');

    expect(tab.nodeName).toEqual('NAV');
    expect(tab.classList.contains('tab')).toBeTruthy();
    expect(items.length).toEqual(2);
    expect(items[0].textContent).toEqual('兑礼信息');
    expect(items[0].classList.contains('tab-item')).toBeTruthy();
    expect(tab.querySelector('.tab-active-line')).not.toBeNull();
    expect(tab.querySelector('.tab-active-line').style.width).toEqual('50%');
  });

  it('renders a tab with notifications', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Tab items={tabItems}></Tab>
          ),
          tab = React.findDOMNode(instance),
          items = tab.querySelectorAll('a');

    expect(items[0].querySelector('.tab-notification')).not.toBeNull();
  });

  it('set the first tab to be active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Tab items={tabItems}></Tab>
          ),
          tab = React.findDOMNode(instance);

    expect(tab.querySelectorAll('a')[0].classList.contains('active')).toBeTruthy();
  });

  it('click to activate a tab', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Tab items={tabItems}></Tab>
          ),
          tab = React.findDOMNode(instance),
          items = tab.querySelectorAll('a');

    expect(items[0].classList.contains('active')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(items[1]);
    expect(items[0].classList.contains('active')).toBeFalsy();
    expect(items[1].classList.contains('active')).toBeTruthy();
  });

  it('.onActivate(name, index)', () => {
    const spy = jasmine.createSpy('onActivate'),
          instance = ReactTestUtils.renderIntoDocument(
            <Tab items={[{
                text: '兑礼信息',
                name: 'gift',
                active: true
              },
              {
                text: '收货地址',
                name: 'address'
              }]} onActivate={spy}></Tab>
          ),
          tab = React.findDOMNode(instance),
          items = tab.querySelectorAll('a');

    ReactTestUtils.Simulate.touchTap(items[0]);
    expect(spy.calls.count()).toEqual(0);

    ReactTestUtils.Simulate.touchTap(items[1]);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('address');
    expect(spy.calls.mostRecent().args[1]).toEqual(1);

    ReactTestUtils.Simulate.touchTap(items[1]);
    expect(spy.calls.count()).toEqual(1);

    ReactTestUtils.Simulate.touchTap(items[0]);
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0]).toEqual('gift');
    expect(spy.calls.mostRecent().args[1]).toEqual(0);
  });


  it('renders a tab at the bottom', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Tab items={tabItems} bottom></Tab>
          ),
          tab = React.findDOMNode(instance);

    expect(tab.classList.contains('tab-bottom')).toBeTruthy();
    expect(tab.querySelector('.tab-active-line')).toBeNull();
    expect(tab.querySelectorAll('.tab-icon').length).toEqual(2);
  });
});