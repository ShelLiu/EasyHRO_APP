/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Search from '../../src/components/Search/Search.jsx';

describe('Search', () => {

  it('renders a search', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Search />
    ),
          search = React.findDOMNode(instance);

    expect(search.nodeName).toEqual('DIV');
    expect(search.classList.contains('search')).toBeTruthy();
    expect(search.querySelector('.search-toggle').nodeName).toEqual('BUTTON');
  });

  it('open a search', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Search placeholder='请输入搜索内容' />
    ),
          search = React.findDOMNode(instance),
          toggle = search.querySelector('.search-toggle');

    expect(search.querySelector('.search-text')).toBeNull();

    ReactTestUtils.Simulate.touchTap(toggle);

    expect(search.querySelector('.search-text')).not.toBeNull();
    expect(search.querySelector('input').placeholder).toEqual('请输入搜索内容');
    expect(search.querySelector('.search-close')).not.toBeNull();
  });

  it('closes a search', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Search />
    ),
          search = React.findDOMNode(instance);

    ReactTestUtils.Simulate.touchTap(search.querySelector('.search-toggle'));
    expect(search.querySelector('.search-text')).not.toBeNull();
    expect(search.querySelector('.search-close')).not.toBeNull();

    ReactTestUtils.Simulate.touchTap(search.querySelector('.search-close'));
    expect(search.querySelector('.search-toggle')).not.toBeNull();
    //expect(search.querySelector('.search-text')).toBeNull();
    //expect(search.querySelector('.search-close')).toBeNull();
  });

  it('.onSearch(text)', () => {
    const spy = jasmine.createSpy('onSearch'),
          instance = ReactTestUtils.renderIntoDocument(
            <Search onSearch={spy} />
          ),
          search = React.findDOMNode(instance);

    ReactTestUtils.Simulate.touchTap(search.querySelector('.search-toggle'));

    const input = search.querySelector('input');
    input.value = 'search text';
    ReactTestUtils.Simulate.change(input);
    //ReactTestUtils.Simulate.blur(input);
    ReactTestUtils.Simulate.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });

    expect(spy.calls.count()).toEqual(1);
    expect(spy.calls.mostRecent().args[0]).toEqual('search text');
  });
});