/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Form from '../../src/components/Form/Form.jsx';


describe('Form', () => {
  const submitButton = {
    text: '登录',
    hollow: true
  };

  const controls = [
    {
      type: 'text',
      id: 'company',
      icon: 'home',
      required: true
    },
    {
      type: 'text',
      id: 'username',
      icon: 'user',
      required: true
    }
  ];

  it('renders a form with actions', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Form action='/form'></Form>
          ),
          form = React.findDOMNode(instance);

    expect(form.nodeName).toEqual('FORM');
    expect(form.action).toEqual('http://' + location.host + '/form');
  });

  it('renders a form with a submit button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Form action='/form' submitButton={submitButton}></Form>
          ),
          form = React.findDOMNode(instance);

    expect(form.querySelector('.form-submit')).not.toBeNull();
    expect(form.querySelector('button').textContent).toEqual('登录');
  });

  it('renders form controls', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Form action='/form' submitButton={submitButton} controls={controls}></Form>
          ),
          form = React.findDOMNode(instance),
          inputs = form.querySelectorAll('input');

    expect(form.querySelectorAll('.form-control').length).toEqual(2);
    expect(inputs.length).toEqual(2);
    expect(inputs[0].id).toEqual('company');
    expect(inputs[0].required).toBeTruthy();
    expect(inputs[1].id).toEqual('username');
    expect(inputs[1].required).toBeTruthy();
  });

  it('.isValid()', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Form action='/form' submitButton={submitButton} controls={controls}></Form>
          ),
          form = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(false);

    form.querySelector('#company').value = 'cdp';
    form.querySelector('#username').value = 'cdp';
    ReactTestUtils.Simulate.change(form.querySelector('#company'));
    ReactTestUtils.Simulate.change(form.querySelector('#username'));
    expect(instance.isValid()).toEqual(true);

    form.querySelector('#company').value = '';
    ReactTestUtils.Simulate.change(form.querySelector('#company'));
    expect(instance.isValid()).toEqual(false);
  });

  it('can not submit when the form is invalid', () => {
    const spy = jasmine.createSpy('onSubmit'),
          instance = ReactTestUtils.renderIntoDocument(
            <Form action='/form' controls={controls} submitButton={submitButton} onSubmit={spy}></Form>
          ),
          form = React.findDOMNode(instance),
          button = form.querySelector('button');

    expect(button.disabled).toBeTruthy();
    ReactTestUtils.Simulate.submit(form);
    expect(spy.calls.count()).toEqual(0);

    form.querySelector('#company').value = 'cdp';
    form.querySelector('#username').value = 'cdp';
    ReactTestUtils.Simulate.change(form.querySelector('#company'));
    ReactTestUtils.Simulate.change(form.querySelector('#username'));

    expect(button.disabled).toBeFalsy();
    ReactTestUtils.Simulate.submit(form);
    expect(spy.calls.count()).toEqual(1);
  });
});