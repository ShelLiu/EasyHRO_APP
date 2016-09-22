/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import RecordList from '../../src/components/RecordList/RecordList.jsx';


describe('Record list', () => {
  const recordList = [
    {
      id: 1,
      name: '张阿十',
      time: '2015/08/05 10:30 – 2015/08/05 18:00',
      status: 2
    },
    {
      id: 2,
      name: '张阿廿',
      time: '2015/08/05 10:30 – 2015/08/05 18:00',
      status: 3
    }
  ];

  function select(item) {
    return item.id === 1;
  }

  it('renders a record list', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <RecordList recordList={recordList} url='leave-record'></RecordList>
          ),
          records = React.findDOMNode(instance);

    expect(records.nodeName).toEqual('UL');
    expect(records.querySelectorAll('.record-item').length).toEqual(2);
    expect(records.querySelectorAll('.record-item')[0].href).toEqual(document.baseURI + '#/leave-record/1');
  });

  it('selectable', () => {
    const spy = jasmine.createSpy(),
          instance = ReactTestUtils.renderIntoDocument(
            <RecordList recordList={recordList} url='leave-record'
                        selectable={select} toggleSelect={spy}></RecordList>
          ),
          records = React.findDOMNode(instance),
          items = records.querySelectorAll('li');

    expect(items[0].querySelector('.record-item-select')).not.toBeNull();
    expect(items[1].querySelector('.record-item-select')).toBeNull();

    items[0].querySelector('input').checked = true;
    ReactTestUtils.Simulate.change(items[0].querySelector('input'));
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0].id).toEqual(1);
    expect(spy.calls.mostRecent().args[1]).toEqual(true);

    items[0].querySelector('input').checked = false;
    ReactTestUtils.Simulate.change(items[0].querySelector('input'));
    expect(spy.calls.count()).toEqual(2);
    expect(spy.calls.mostRecent().args[0].id).toEqual(1);
    expect(spy.calls.mostRecent().args[1]).toEqual(false);
  });
});