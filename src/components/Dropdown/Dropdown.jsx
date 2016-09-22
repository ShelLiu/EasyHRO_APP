/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './dropdown.less';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import dom from '../../common/utils/dom';
import Button from '../Button/Button.jsx';


export default class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this._clickAwayClose = this._clickAwayClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('touchend', this._clickAwayClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this._clickAwayClose, false);
  }

  render() {
    const { items, onClickItem } = this.props;
    const dropdownItems = this.state.opened
            ? <ul className='dropdown'>
                {
                  items.map((item, index) => {
                    return <li className='dropdown-item' key={index}
                               onClick={this._clickItem.bind(this, item.name)}>{item.text}</li>;
                  })
                }
              </ul>
            : null;

    this.onClickItem = onClickItem;

    return (
      <div>
        <Button className='dropdown-toggle' icon='cdp-point' iconType='icomoon' onTouchTap={this.toggle}></Button>
        <CSSTransitionGroup component='div' transitionName='dropdown'>
          {dropdownItems}
        </CSSTransitionGroup>
      </div>
    );
  }


  /**
   * Test whether the dropdown is opened
   * @returns {boolean}
   */
  isOpened() {
    return this.state.opened;
  }


  /**
   * Open the dropdown
   */
  open() {
    this.setState({
      opened: true
    });
  }


  /**
   * Close the dropdown
   */
  close() {
    this.setState({
      opened: false
    });
  }


  /**
   * Toggle openedn status
   */
  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }


  /**
   * Triggers callback and close the dropdown
   * @param {string} name
   * @private
   */
  _clickItem(name) {
    if (typeof this.onClickItem === 'function') {
      this.onClickItem.call(this, name);
    }
    this.close();
  }


  /**
   * Click away to close
   * @param {Event} e
   * @private
   */
  _clickAwayClose(e) {
    if (!dom.contains(React.findDOMNode(this), e.target)) {
      this.close();
    }
  }
}