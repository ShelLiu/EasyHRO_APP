/**
 * Created by Sherry.Liu on 2016/11/9.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ConfirmButton from '../../src/components/ConfirmButton/ConfirmButton.jsx';


describe('ConfirmButton', () => {

  it('renders a ConfirmButton', () => {
    const instance = ReactTestUtils.renderIntoDocument(
        <ConfirmButton text='Revoke' onTouchTap={alert('Success')} />
    ),
        button = React.findDOMNode(instance).querySelector('button');

    expect(button.nodeName).toEqual('BUTTON');
    expect(button.textContent).toEqual('Revoke');
    expect(button.type).toEqual('button');
  });
});