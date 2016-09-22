/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './header.less';

import React, { Component } from 'react';

import Button from '../Button/Button.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';


export default class Header extends Component {

  render() {
    const { title, iconLeft, iconRight, onTapLeft, onTapRight, back, goBack, dropdown } = this.props;

    const buttonLeft = (back || goBack)
            ? <Button className='header-icon-left'
                      icon='cdp-left-arrow'
                      iconType='icomoon'
                      onClick={back ? this.back.bind(this, back) : this.goBack} />
            : iconLeft
                ? <Button className='header-icon-left'
                          icon={iconLeft}
                          iconType='icomoon'
                          onClick={onTapLeft} />
                : null;
    const buttonRight = iconRight
            ? <Button className='header-icon-right'
                      icon={iconRight} iconType='
                      icomoon'
                      onClick={onTapRight} />
            : null;
    const dropdownMenu = dropdown
            ? <Dropdown {...dropdown} />
            : null;

    return (
      <header>
        <h1>{title}</h1>
        {buttonLeft}
        {buttonRight}
        {dropdownMenu}
        {this.props.children}
      </header>
    );
  }


  /**
   * `Back` event for `back` icon
   */
  back(hash) {
    location.hash = typeof hash === 'string' ? hash : '';
  }


  /**
   * `Back` event for `back` icon
   */
  goBack() {
    history.back();
  }
}
