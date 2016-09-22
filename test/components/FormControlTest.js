/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import FormControl from '../../src/components/FormControl/FormControl.jsx';
import Select from '../../src/components/Select/Select.jsx';


describe('Form control', () => {
  const options = [
    {
      text: '2015',
      value: 2015
    }
  ];

  it('renders a form control', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份'>
              <Select options={options} placeholder='年份'></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance);

    expect(control.classList.contains('form-control')).toBeTruthy();
    expect(control.querySelector('.form-label')).not.toBeNull();
    expect(control.querySelector('.form-label').textContent).toEqual('年份');
    expect(control.querySelector('select')).not.toBeNull();
  });

  it('renders half controls', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份' half>
              <Select options={options} placeholder='年份'></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance);

    expect(control.classList.contains('form-control-half')).toBeTruthy();
  });

  it('renders tips', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份' tips='不得早于 2015 年'>
              <Select options={options}></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance),
          tips = control.querySelector('.form-tips');

    expect(tips).not.toBeNull();
    expect(tips.textContent).toEqual('(不得早于 2015 年)');
  });

  it('adds `.form-has-data` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份'>
              <Select options={options} placeholder='年份' defaultValue='2015'></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance),
          select = control.querySelector('select');

    expect(control.classList.contains('form-has-data')).toBeTruthy();

    select.value = '';
    ReactTestUtils.Simulate.change(select);
    expect(control.classList.contains('form-has-data')).toBeFalsy();

    select.value = '2015';
    ReactTestUtils.Simulate.change(select);
    expect(control.classList.contains('form-has-data')).toBeTruthy();
  });

  it('adds `.form-focus` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份'>
              <Select options={options} placeholder='年份'></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance),
          select = control.querySelector('select');

    expect(control.classList.contains('form-focus')).toBeFalsy();

    ReactTestUtils.Simulate.focus(select);
    expect(control.classList.contains('form-focus')).toBeTruthy();

    ReactTestUtils.Simulate.blur(select);
    expect(control.classList.contains('form-focus')).toBeFalsy();
  });

  it('adds `.form-valid` and `.form-invalid` classes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <FormControl label='年份'>
              <Select options={options} placeholder='年份' required></Select>
            </FormControl>
          ),
          control = React.findDOMNode(instance),
          select = control.querySelector('select');

    expect(control.classList.contains('form-valid')).toBeFalsy();
    expect(control.classList.contains('form-invalid')).toBeFalsy();

    select.value = '';
    ReactTestUtils.Simulate.blur(select);
    expect(control.classList.contains('form-invalid')).toBeTruthy();
    expect(control.classList.contains('form-valid')).toBeFalsy();

    select.value = '2015';
    ReactTestUtils.Simulate.blur(select);
    expect(control.classList.contains('form-valid')).toBeTruthy();
    expect(control.classList.contains('form-invalid')).toBeFalsy();
  });
});