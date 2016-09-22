/**
 * Created by AshZhang on 15/10/9.
 */


'use strict';


import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PullLoader from '../../src/components/PullLoader/PullLoader.jsx';


describe('PullLoader', () => {

  it('renders a loader', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PullLoader />
          ),
          loader = React.findDOMNode(instance),
          pull = loader.querySelector('.pull-loader');

    expect(pull).not.toBeNull();
  });

  it('status: loading', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PullLoader status='loading'>
              <h1>PullLoader</h1>
            </PullLoader>
          ),
          loader = React.findDOMNode(instance),
          pull = loader.querySelector('.pull-loader');

    expect(pull).not.toBeNull();
    expect(pull.classList.contains('loading')).toBeTruthy();
    expect(loader.querySelector('h1')).not.toBeNull();
    expect(loader.querySelector('.fa-spinner.fa-pulse')).not.toBeNull();
  });

  it('status: loaded', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PullLoader status='loaded'>
              <h1>PullLoader</h1>
            </PullLoader>
          ),
          loader = React.findDOMNode(instance),
          pull = loader.querySelector('.pull-loader');

    expect(pull.classList.contains('loaded')).toBeTruthy();
    expect(loader.querySelector('h1')).not.toBeNull();
  });

  it('status: load-error', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PullLoader status='no-more-data'>
              <h1>PullLoader</h1>
            </PullLoader>
          ),
          loader = React.findDOMNode(instance),
          pull = loader.querySelector('.pull-loader');

    expect(pull.classList.contains('no-more-data')).toBeTruthy();
    expect(loader.querySelector('h1')).not.toBeNull();
    expect(loader.querySelector('.fa-meh-o')).not.toBeNull();
  });
});