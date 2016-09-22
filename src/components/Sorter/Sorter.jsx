/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import './sorter.less';

import React, { Component } from 'react';


export default class Sorter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items || []
    };

    // Initialize default item
    this.state.items.forEach((item) => {
      item.active = item.name === this.props.defaultItem;
    });
  }

  render() {
    const { items } = this.state;

    return (
      <ul className='sorter'>
        {
          items.map((item, index) => {
            const className = 'sorter-item'
              + (item.active ? ' active' : '')
              + (item.order === 'ASC' ? ' asc' : ' desc');

            return (
              <li className={className} key={index}
                  onTouchTap={this.onActivateSort.bind(this, index)}>
                <span className='sorter-item-text'>{item.text}</span>
              </li>
            );
          })
        }
      </ul>
    );
  }


  /**
   * Activate sorter item by index
   * @param {number} index
   */
  onActivateSort(index) {
    const items = this.state.items,
          item = items[index];

    if (item.active) {

      // Switch order only if the item is active
      item.order = (item.order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      items.forEach((item, itemIndex) => {
        item.active = (itemIndex === index);
      });
    }

    this.setState({ items });

    if (typeof this.props.onSort === 'function') {
      this.props.onSort.call(this, item.name, item.order);
    }
  }
}