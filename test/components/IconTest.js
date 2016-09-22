/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Icon from '../../src/components/Icon/Icon.jsx';


describe('Icon', () => {

  it('renders an icon with given class name', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Icon name='sign-out'></Icon>
          ),
          icon = React.findDOMNode(instance);

    expect(icon.classList.contains('fa')).toBeTruthy();
    expect(icon.classList.contains('fa-sign-out')).toBeTruthy();
  });

  it('renders a button icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Icon name='sign-out' button></Icon>
          ),
          icon = React.findDOMNode(instance);

    expect(icon.classList.contains('fa')).toBeTruthy();
    expect(icon.classList.contains('fa-sign-out')).toBeTruthy();
    expect(icon.classList.contains('icon-button')).toBeTruthy();
  });
});