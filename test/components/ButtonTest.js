/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Button from '../../src/components/Button/Button.jsx';


describe('Button', () => {

  it('renders a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button text='登录'></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.nodeName).toEqual('BUTTON');
    expect(button.textContent).toEqual('登录');
    expect(button.type).toEqual('button');
  });

  it('renders a submit button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button type='submit' text='登录'></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.type).toEqual('submit');
  });

  it('renders a button with an icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button icon='sign-out'></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.nodeName).toEqual('BUTTON');
    expect(button.querySelector('.fa-sign-out')).not.toBeNull();
    expect(button.querySelector('.icon-button')).not.toBeNull();
  });

  it('renders an action button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button icon='sign-out' action></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.nodeName).toEqual('BUTTON');
    expect(button.classList.contains('btn-action')).toBeTruthy();
  });

  it('renders a hollow button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button hollow></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.classList.contains('btn-hollow')).toBeTruthy();
  });

  it('renders a link button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Button link></Button>
          ),
          button = React.findDOMNode(instance);

    expect(button.classList.contains('btn-link')).toBeTruthy();
  });
});