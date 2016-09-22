/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Filter from '../../src/components/Filter/Filter.jsx';


describe('Filter', () => {
  const filterItems = [
    {
      text: '时间',
      name: 'time',
      choices: [
        {
          text: '本月',
          name: 'thisMonth'
        },
        {
          text: '全部',
          name: 'all'
        }
      ]
    },
    {
      text: '状态',
      name: 'status',
      choices: [
        {
          text: '已审批',
          name: 'approved'
        },
        {
          text: '未审批',
          name: 'pending'
        }
      ]
    }
  ];

  it('renders a filter', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Filter items={filterItems}></Filter>
          ),
          filter = React.findDOMNode(instance),
          items = filter.querySelectorAll('.filter-item');

    expect(filter.nodeName).toEqual('UL');
    expect(filter.classList.contains('filter')).toBeTruthy();
    expect(items.length).toEqual(2);
    expect(items[0].querySelectorAll('.filter-choice').length).toEqual(2);
  });

  it('tap an item to open choices', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Filter items={filterItems}></Filter>
          ),
          filter = React.findDOMNode(instance),
          item1 = filter.querySelectorAll('.filter-item')[0],
          item2 = filter.querySelectorAll('.filter-item')[1];

    expect(item1.classList.contains('opened')).toBeFalsy();

    ReactTestUtils.Simulate.touchTap(item1.querySelector('.filter-text'));
    expect(item1.classList.contains('opened')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(item2.querySelector('.filter-text'));
    expect(item1.classList.contains('opened')).toBeFalsy();
    expect(item2.classList.contains('opened')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(item2.querySelector('.filter-text'));
    expect(item2.classList.contains('opened')).toBeFalsy();
  });

  it('selects a filter', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Filter items={filterItems}></Filter>
          ),
          filter = React.findDOMNode(instance),
          item1 = filter.querySelectorAll('.filter-item')[0],
          item2 = filter.querySelectorAll('.filter-item')[1];

    expect(item1.classList.contains('active')).toBeFalsy();

    ReactTestUtils.Simulate.touchTap(item1.querySelector('.filter-choice'));
    expect(item1.classList.contains('active')).toBeTruthy();
    expect(item1.querySelector('.filter-choice').classList.contains('active')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(item2.querySelector('.filter-choice'));
    expect(item1.classList.contains('active')).toBeFalsy();
    expect(item2.classList.contains('active')).toBeTruthy();
    expect(item1.querySelector('.filter-choice').classList.contains('active')).toBeFalsy();
    expect(item2.querySelector('.filter-choice').classList.contains('active')).toBeTruthy();
  });

  it('.onFilter(item, choice)', () => {
    const spy = jasmine.createSpy(),
          instance = ReactTestUtils.renderIntoDocument(
            <Filter items={filterItems} onFilter={spy}></Filter>
          ),
          filter = React.findDOMNode(instance),
          item1 = filter.querySelectorAll('.filter-item')[0],
          item2 = filter.querySelectorAll('.filter-item')[1];

    ReactTestUtils.Simulate.touchTap(item1.querySelector('.filter-choice'));
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('time');
    expect(spy.calls.mostRecent().args[1]).toEqual('thisMonth');
  });
});