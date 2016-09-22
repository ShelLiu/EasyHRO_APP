/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Sorter from '../../src/components/Sorter/Sorter.jsx';


describe('Sorter', () => {
  const data = [
    {
      text: '姓名',
      name: 'name',
      order: 'asc'
    },
    {
      text: '入职时间',
      name: 'joinTime',
      order: 'desc'
    }
  ];

  it('renders a sorter', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Sorter items={data} defaultItem='name'></Sorter>
    ),
          sorter = React.findDOMNode(instance),
          items = sorter.querySelectorAll('li');

    expect(sorter.nodeName).toEqual('UL');
    expect(sorter.classList.contains('sorter')).toBeTruthy();
    expect(items.length).toEqual(2);
    expect(items[0].textContent).toEqual('姓名');
  });

  it('renders sorter items', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Sorter items={data} defaultItem='name'></Sorter>
    ),
          sorter = React.findDOMNode(instance),
          items = sorter.querySelectorAll('li');

    expect(items[0].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('asc')).toBeTruthy();
    expect(items[1].classList.contains('active')).toBeFalsy();
    expect(items[1].classList.contains('desc')).toBeTruthy();
  });

  it('.onSort(name, order)', () => {
    const spy = jasmine.createSpy('onSort'),
          instance = ReactTestUtils.renderIntoDocument(
            <Sorter items={data} defaultItem='name' onSort={spy}></Sorter>
          ),
          sorter = React.findDOMNode(instance),
          items = sorter.querySelectorAll('li');

    expect(spy).not.toHaveBeenCalled();

    ReactTestUtils.Simulate.touchTap(items[1]);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('joinTime');
    expect(spy.calls.mostRecent().args[1]).toEqual('desc');
    expect(items[1].classList.contains('active')).toBeTruthy();
    expect(items[1].classList.contains('desc')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(items[1]);
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0]).toEqual('joinTime');
    expect(spy.calls.mostRecent().args[1]).toEqual('asc');
    expect(items[1].classList.contains('active')).toBeTruthy();
    expect(items[1].classList.contains('asc')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(items[0]);
    expect(spy.calls.count()).toEqual(3);
    expect(spy.calls.mostRecent().args[0]).toEqual('name');
    expect(spy.calls.mostRecent().args[1]).toEqual('asc');
    expect(items[1].classList.contains('active')).toBeFalsy();
    expect(items[0].classList.contains('active')).toBeTruthy();
    expect(items[0].classList.contains('asc')).toBeTruthy();
  });
});