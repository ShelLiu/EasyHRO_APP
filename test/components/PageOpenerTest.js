/**
 * Created by AshZhang on 15/10/3.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PageOpener from '../../src/components/PageOpener/PageOpener.jsx';


describe('Page opener', () => {

  it('renders a page', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PageOpener></PageOpener>
          ),
          page = React.findDOMNode(instance);

    expect(page.nodeName).toEqual('DIV');
    expect(page.classList.contains('page-opener')).toBeTruthy();
  });

  it('opens a page', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PageOpener></PageOpener>
          ),
          page = React.findDOMNode(instance);

    expect(page.classList.contains('opened')).toBeFalsy();

    instance.open({});
    expect(page.classList.contains('opened')).toBeTruthy();
  });

  it('closes a page', () => {
    const instance = ReactTestUtils.renderIntoDocument(
            <PageOpener></PageOpener>
          ),
          page = React.findDOMNode(instance),
          closer = page.querySelector('.page-closer');

    expect(closer).not.toBeNull();

    instance.open({});
    expect(page.classList.contains('opened')).toBeTruthy();

    ReactTestUtils.Simulate.touchTap(closer);
    expect(page.classList.contains('opened')).toBeFalsy();
  });
});