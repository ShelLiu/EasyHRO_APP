/**
 * Created by AshZhang on 15/10/13.
 */


'use strict';

import './sideNav.less';

import React, { Component } from 'react';


export default class SideNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.close = this.close.bind(this);
  }

  render() {
    const { data = [] } = this.props,
          { opened } = this.state,
          navClass = 'side-nav' + (opened ? ' opened' : '');

    return (
      <div>
        <nav className={navClass}>
          {
            data.map((item, index) => {
              return <a className='side-nav-item' key={index}
                        href={item.link ? `#/${item.link}` : null}
                        onClick={this.onTouchTap.bind(this, item.onTouchTap)}>{item.text}</a>;
            })
          }
        </nav>
        {
          opened ? <div className='side-nav-cover' onTouchEnd={this.close}></div> : null
        }
      </div>
    );
  }


  /**
   * Open the nav
   */
  open() {
    this.setState({
      opened: true
    });
    document.body.classList.add('side-nav-opened');
  }


  /**
   * Close the nav
   */
  close() {
    setTimeout(() => {
      this.setState({
        opened: false
      });
      document.body.classList.remove('side-nav-opened');
    }, 300);
  }


  /**
   * When a menu item is touched
   * @param {Function} callback
   */
  onTouchTap(callback) {
    this.close();

    if (typeof callback === 'function') {
      callback();
    }
  }
}