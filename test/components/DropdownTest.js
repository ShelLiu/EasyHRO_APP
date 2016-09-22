/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Dropdown from '../../src/components/Dropdown/Dropdown.jsx';


describe('Dropdown', () => {
  const items = [
    {
      text: '中文',
      name: 'zh'
    },
    {
      text: 'English',
      name: 'en'
    }
  ];

  it('renders a menu with items', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Dropdown items={items}></Dropdown>
          ),
          dropdown = React.findDOMNode(instance),
          listHolder = dropdown.lastElementChild;

    instance.open();

    const dropdownItems = dropdown.querySelectorAll('li');

    expect(dropdown.firstElementChild.nodeName).toEqual('BUTTON');
    expect(dropdown.firstElementChild.classList.contains('dropdown-toggle')).toBeTruthy();
    expect(listHolder.firstElementChild.nodeName).toEqual('UL');
    expect(listHolder.firstElementChild.classList.contains('dropdown')).toBeTruthy();
    expect(dropdownItems.length).toEqual(2);
    expect(dropdownItems[0].classList.contains('dropdown-item')).toBeTruthy();
    expect(dropdownItems[0].textContent).toEqual('中文');
    expect(dropdownItems[1].textContent).toEqual('English');
  });

  it('.open() .close() .toggle() .isOpened()', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Dropdown items={items}></Dropdown>
          ),
          dropdown = React.findDOMNode(instance),
          listHolder = dropdown.lastElementChild;

    expect(listHolder.firstElementChild).toBeNull();

    instance.open();
    expect(listHolder.firstElementChild.nodeName).toEqual('UL');
    expect(instance.isOpened()).toBeTruthy();

    instance.close();
    expect(instance.isOpened()).toBeFalsy();

    instance.toggle();
    expect(listHolder.firstElementChild.nodeName).toEqual('UL');
    expect(instance.isOpened()).toBeTruthy();

    instance.toggle();
    expect(instance.isOpened()).toBeFalsy();
  });

  it('tap other place to close', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Dropdown items={items}></Dropdown>
          ),
          dropdown = React.findDOMNode(instance),
          listHolder = dropdown.lastElementChild;

    expect(listHolder.firstElementChild).toBeNull();

    instance.open();
    expect(listHolder.firstElementChild.nodeName).toEqual('UL');
    expect(instance.isOpened()).toBeTruthy();

    //ReactTestUtils.Simulate.touchTap(document.body);
    //expect(instance.isOpened()).toBeFalsy();
  });


  it('.onClickItem(name)', () => {
    const spy = jasmine.createSpy(),
          instance = ReactTestUtils.renderIntoDocument(
            <Dropdown items={items} onClickItem={spy}></Dropdown>
          ),
          dropdown = React.findDOMNode(instance);

    instance.open();

    const dropdownItems = dropdown.querySelectorAll('li');

    ReactTestUtils.Simulate.click(dropdownItems[0]);
    expect(spy.calls.mostRecent().args[0]).toEqual('zh');
    expect(spy.calls.mostRecent().object).toEqual(instance);
  });
});