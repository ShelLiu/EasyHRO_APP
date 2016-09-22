/**
 * Created by AshZhang on 15/10/4.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import LoginContainer from '../../src/containers/Login/LoginContainer.jsx';


describe('Login container', () => {
  let instance, login,
      loginSpy;

  beforeEach(() => {
    loginSpy = spyOn(LoginContainer.prototype, 'login');
    instance = ReactTestUtils.renderIntoDocument(
      <LoginContainer />
    );
    login = React.findDOMNode(instance);
  });


  it('renders a login', () => {
    expect(login).not.toBeNull();
  });
});