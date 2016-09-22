/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import InfoCard from '../../src/components/InfoCard/InfoCard.jsx';


describe('Info card', () => {
  const data = [
    {
      name: '姓名',
      value: '张阿十'
    },
    {
      name: '性别',
      value: '女'
    }
  ];

  it('renders an info card', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <InfoCard title='基本信息' items={data}></InfoCard>
          ),
          card = React.findDOMNode(instance);

    expect(card.nodeName).toEqual('SECTION');
    expect(card.classList.contains('info-card')).toBeTruthy();
    expect(card.querySelector('h1').textContent).toEqual('基本信息');
  });

  it('renders info items', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <InfoCard items={data}></InfoCard>
          ),
          card = React.findDOMNode(instance),
          item = card.querySelector('li');

    expect(card.querySelectorAll('li').length).toEqual(2);
    expect(card.querySelectorAll('.info-card-item').length).toEqual(2);
    expect(item.querySelector('.info-card-name').textContent).toEqual('姓名');
    expect(item.querySelector('.info-card-value').textContent).toEqual('张阿十');
  });

  it('renders info items without `name`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <InfoCard items={[{ value: 1 }]}></InfoCard>
          ),
          card = React.findDOMNode(instance),
          item = card.querySelector('li');

    expect(item.querySelector('.info-card-name')).toBeNull();
    expect(item.querySelector('.info-card-value').textContent).toEqual('1');
  });
});