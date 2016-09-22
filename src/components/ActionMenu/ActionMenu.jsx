/**
 * Created by AshZhang on 15/9/26.
 */


'use strict';

import './actionMenu.less';

import React, { Component } from 'react';

import Icon from '../Icon/Icon.jsx';


export default class ActionMenu extends Component {

  render() {
    const { items } = this.props,
          menuItems = items.map((item, index) => {
            const style = item.style || 1,
                  className = `action-menu-item action-menu-style-${style} clearfix`;

            return <a key={index}
                      href={item.url || `#/${item.link}`}
                      className={className}
                      target={item.url ? '_blank' : '_self'}>
              <i className={'icon-fontello icon-' + item.icon + ' action-menu-icon'}>
                {
                  item.notification ? <span className='action-menu-label'>{item.notification}</span> : null
                }
              </i>
              <div className='action-menu-text'>{item.text}</div>
              <div className='action-menu-desc'>{item.content}</div>
            </a>;
          });

    return (
      <nav className='action-menu clearfix'>
        {menuItems}
      </nav>
    );
  }
}
