/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Loader from '../../src/components/Loader/Loader.jsx';


describe('Loader', () => {

  it('renders a loader', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Loader />
          ),
          loader = React.findDOMNode(instance);

    expect(loader.classList.contains('loader')).toBeTruthy();
  });

  it('status: loading', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Loader status='loading'>
              <h1>Loader</h1>
            </Loader>
          ),
          loader = React.findDOMNode(instance);

    expect(loader.classList.contains('loader')).toBeTruthy();
    expect(loader.classList.contains('loading')).toBeTruthy();
    expect(loader.querySelector('h1')).toBeNull();
    expect(loader.querySelector('.fa-spinner.fa-pulse')).not.toBeNull();
  });

  it('status: loaded', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Loader status='loaded'>
              <h1>Loader</h1>
            </Loader>
          ),
          loader = React.findDOMNode(instance);

    expect(loader.classList.contains('loader')).toBeTruthy();
    expect(loader.classList.contains('loaded')).toBeTruthy();
    expect(loader.querySelector('h1')).not.toBeNull();
    expect(loader.querySelector('.fa-spinner.fa-pulse')).toBeNull();
  });

  it('status: load-error', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <Loader status='load-error'>
              <h1>Loader</h1>
            </Loader>
          ),
          loader = React.findDOMNode(instance);

    expect(loader.classList.contains('loader')).toBeTruthy();
    expect(loader.classList.contains('load-error')).toBeTruthy();
    expect(loader.querySelector('h1')).toBeNull();
    expect(loader.querySelector('.fa-meh-o')).not.toBeNull();
  });
});