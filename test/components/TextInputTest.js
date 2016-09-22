/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TextInput from '../../src/components/TextInput/TextInput.jsx';


describe('TextInput', () => {

  it('renders an input', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' defaultValue='Ash' id='name' />
          ),
          input = React.findDOMNode(instance);

    expect(input.nodeName).toEqual('INPUT');
    expect(input.id).toEqual('name');
    expect(input.type).toEqual('text');
    expect(input.placeholder).toEqual('用户名');
    expect(input.value).toEqual('Ash');
  });

  it('renders an input with icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TextInput icon='home' id='name' />
    ),
          input = React.findDOMNode(instance);

    expect(input.classList.contains('text-input-with-icon')).toBeTruthy();
    expect(input.querySelector('input')).not.toBeNull();
    expect(input.querySelector('input').id).toEqual('name');
    expect(input.querySelector('.text-input-icon')).not.toBeNull();
  });

  it('.isValid() - required', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' required />
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(false);

    input.value = 'ash';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });

  it('.isValid() - maxLength', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' maxLength='2' />
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(true);

    input.value = 'ash';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(false);

    input.value = 'a';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });

  it('.isValid() - minLength', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' minLength='2' />
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(true);

    input.value = 'a';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(false);

    input.value = 'ash';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });

  it('.isValid() - max', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' max='2' />
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(true);

    input.value = '10';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(false);

    input.value = '1';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });

  it('.isValid() - min', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' min='2' />
          ),
          input = React.findDOMNode(instance);

    expect(instance.isValid()).toEqual(true);

    input.value = '1';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(false);

    input.value = '10';
    ReactTestUtils.Simulate.change(input);
    expect(instance.isValid()).toEqual(true);
  });

  it('.onValid(value), .onInvalid(value)', () => {
    const spy = jasmine.createSpy('onValid'),
          spy2 = jasmine.createSpy('onInvalid'),
          instance = ReactTestUtils.renderIntoDocument(
            <TextInput placeholder='用户名' required onValid={spy} onInvalid={spy2} />
          ),
          input = React.findDOMNode(instance);

    input.value = '1';
    ReactTestUtils.Simulate.blur(input);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('1');

    input.value = '';
    ReactTestUtils.Simulate.blur(input);
    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('1');

    expect(spy2.calls.count()).toEqual(1);
    expect(spy2.calls.mostRecent().args[0]).toEqual('');
  });
});