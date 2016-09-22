/**
 * Created by AshZhang on 15/10/3.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Checkbox from '../../src/components/Checkbox/Checkbox.jsx';


describe('Checkbox', () => {

  it('renders a checkbox', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Checkbox placeholder='记住我' defaultChecked={true} id='check' />
          ),
          input = React.findDOMNode(instance),
          check = input.querySelector('[type=checkbox]');

    expect(input.nodeName).toEqual('LABEL');
    expect(check).not.toBeNull();
    expect(check.id).toEqual('check');
    expect(check.checked).toEqual(true);
    expect(input.querySelector('.checkbox-text').textContent).toEqual('记住我');
  });
});