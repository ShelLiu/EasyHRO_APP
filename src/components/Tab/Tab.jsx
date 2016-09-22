/**
 * Created by AshZhang on 15/9/25.
 */


'use strict';

import './tab.less';

import React, { Component } from 'react';

import Icon from '../Icon/Icon.jsx';


export default class Tab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items
    };
  }

  render() {
    const { items } = this.state,
          { bottom, onActivate } = this.props,
          tabClass = 'tab clearfix tab-count-'
                        + items.length
                        + (bottom ? ' tab-bottom' : ''),
          style = {
            width: (100 / items.length) + '%'
          };

    this.onActivate = onActivate;

    // Default active
    if (!(items.some(item => item.active)) ||
        (items.filter(item => item.active)[0] &&
        location.hash.indexOf(items.filter(item => item.active)[0].name) === -1)) {
      items.forEach((item) => {
        item.active = location.hash.indexOf(item.name) !== -1;
      });

      if (!(items.some(item => item.active))) {
        items[0].active = true;
      }
    }

    const tabItems = items.map((item, index) => {
      const className = 'tab-item' + (item.active ? ' active' : '');

      return <a className={className} key={index}
                href={`#/${item.name}`}
                style={style}
                onTouchTap={this.activateTab.bind(this, index)}>
        {
          item.icon
            ? <Icon name={item.icon} className='tab-icon' />
            : null
        }
        {item.text}
        {item.notification ? <span className='tab-notification' /> : null}
      </a>;
    });

    return (
      <nav className={tabClass}>
        {tabItems}
        {
          bottom
            ? null
            : <div className='tab-active-line' style={{width: 100 / items.length + '%'}}></div>
        }
      </nav>
    );
  }


  /**
   * Activate a tab by index
   * @param {number} index
   */
  activateTab(index) {
    let oldActiveItem, activeItem;

    this.state.items.forEach((item, itemIndex) => {
      if (item.active) {
        oldActiveItem = item;
      }

      item.active = (itemIndex === index);

      if (item.active) {
        activeItem = item;
      }
    });

    if ((oldActiveItem !== activeItem) && (typeof this.onActivate === 'function')) {
      this.onActivate.call(this, activeItem.name, index);
    }

    this.setState({
      items: this.state.items
    });
  }
}