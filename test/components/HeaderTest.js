/**
 * Header Test
 */


'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Header from '../../src/components/Header/Header.jsx';


describe('Header', () => {

  it('renders a header with title', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Header title='CDP Portal'></Header>
    ),
          header = React.findDOMNode(instance);

    expect(header.nodeName).toEqual('HEADER');
    expect(header.querySelector('h1').textContent).toEqual('CDP Portal');
  });

  it('renders a header with left icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Header iconLeft='sign-out'></Header>
    ),
          header = React.findDOMNode(instance),
          iconLeft = header.querySelector('.header-icon-left');

    expect(iconLeft).not.toBeNull();
    expect(iconLeft.querySelector('.fa-sign-out')).not.toBeNull();
  });

  it('renders a header with right icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Header iconRight='ellipsis-v'></Header>
    ),
          header = React.findDOMNode(instance),
          iconRight = header.querySelector('.header-icon-right');

    expect(iconRight).not.toBeNull();
    expect(iconRight.querySelector('.fa-ellipsis-v')).not.toBeNull();
  });

  it('triggers `onTapLeft` callback', () => {
    const spy = jasmine.createSpy('onTapLeft'),
          instance = ReactTestUtils.renderIntoDocument(
            <Header iconLeft='sign-out' onTapLeft={spy}></Header>
          ),
          header = React.findDOMNode(instance),
          iconLeft = header.querySelector('.header-icon-left');

    expect(spy.calls.count()).toEqual(0);
    ReactTestUtils.Simulate.click(iconLeft);
    expect(spy.calls.count()).toEqual(1);
  });

  it('triggers `onTapRight` callback', () => {
    const spy = jasmine.createSpy('onTapRight'),
          instance = ReactTestUtils.renderIntoDocument(
            <Header iconRight='ellipsis-v' onTapRight={spy}></Header>
          ),
          header = React.findDOMNode(instance),
          iconRight = header.querySelector('.header-icon-right');

    expect(spy.calls.count()).toEqual(0);
    ReactTestUtils.Simulate.click(iconRight);
    expect(spy.calls.count()).toEqual(1);
  });

  it('`back` action', () => {
    spyOn(Header.prototype, 'back');

    const instance = ReactTestUtils.renderIntoDocument(
            <Header back></Header>
          ),
          header = React.findDOMNode(instance),
          iconBack = header.querySelector('.fa-chevron-left');

    expect(iconBack).not.toBeNull();
    expect(iconBack.classList.contains('header-icon-left'));
    expect(Header.prototype.back).not.toHaveBeenCalled();
    ReactTestUtils.Simulate.click(iconBack);
    expect(Header.prototype.back).toHaveBeenCalled();
  });

  it('`dropdown` action', () => {
    spyOn(Header.prototype, 'back');

    const dropdownSetting = {
            items: [
              {
                text: '中文',
                name: 'zh'
              },
              {
                text: 'English',
                name: 'en'
              }
            ],
            onClickItem: jasmine.createSpy()
          },
          instance = ReactTestUtils.renderIntoDocument(
            <Header dropdown={dropdownSetting} />
          ),
          header = React.findDOMNode(instance),
          dropdown = header.lastElementChild;

    expect(dropdown.firstElementChild.nodeName).toEqual('BUTTON');
    expect(dropdown.lastElementChild.nodeName).toEqual('DIV');

    ReactTestUtils.Simulate.touchTap(dropdown.firstElementChild);
    expect(dropdown.querySelectorAll('li').length).toEqual(2);

    ReactTestUtils.Simulate.click(dropdown.querySelector('li'));
    expect(dropdownSetting.onClickItem.calls.count()).toEqual(1);
  });
});