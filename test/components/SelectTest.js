/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Select from '../../src/components/Select/Select.jsx';


describe('Select', () => {
  const options = [
    {
      text: '上海',
      value: 1
    },
    {
      text: '北京',
      value: 2
    }
  ];

  it('renders a select', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Select options={options} id='city'></Select>
    ),
          select = React.findDOMNode(instance);

    expect(select.nodeName).toEqual('SELECT');
    expect(select.id).toEqual('city');
    expect(select.querySelectorAll('option').length).toEqual(2);
    expect(select.querySelector('option').textContent).toEqual('上海');
    expect(select.querySelector('option').value).toEqual('1');
  });

  it('renders a default value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Select options={options} defaultValue='1'></Select>
    ),
          select = React.findDOMNode(instance);

    expect(select.value).toEqual('1');
  });

  it('renders a select with placeholder', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Select options={options} placeholder='请选择'></Select>
          ),
          select = React.findDOMNode(instance);

    expect(select.value).toEqual('');
    expect(select.querySelector('option').textContent).toEqual('请选择');
    expect(select.querySelector('option').value).toEqual('');
  });

  it('.isValid() - required', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Select options={options} placeholder='请选择' required></Select>
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(false);

    input.value = '1';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });
});