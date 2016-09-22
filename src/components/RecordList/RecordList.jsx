/**
 * Created by AshZhang on 15/10/10.
 */


'use strict';

import './record-list.less';

import React, { Component } from 'react';

import lang, { getItem as getLang } from '../../common/lang';


const statusText = [getLang('REJECTED'), getLang('APPROVED'), getLang('PENDING')];


export default class RecordList extends Component {

  render() {
    const { url, recordList = [], selectable, href, onClickItem } = this.props;

    return (
      <ul className={'record-list' + (selectable ? ' record-list-selectable' : '')}>
        {
          (recordList.map ? recordList : []).map((record, index) => {
            return (
              <li key={index} className={record.userName ? 'with-name' : null}>
                {
                  selectable && selectable(record)
                    ? <label className='record-item-select'><input type='checkbox' defaultChecked={!!record.checked} onChange={this.toggleSelect.bind(this, record)} value={record.id} /></label>
                    : null
                }
                <a className='record-item' onClick={onClickItem ? onClickItem.bind(this, record) : null} href={href === null ? null : `#/${url}/${record.id}`}>
                  {
                    record.userName
                      ? <span className='record-item-name-bar'>{record.userName}
                          <span className="text-lighter text-sm gap-l">{record.department}</span>
                        </span>
                      : null
                  }
                  <span className='record-item-name'>{record.Type}</span>
                  <span className='record-item-time'>{record.Start} - {record.End}</span>
                  <span className='record-item-hours'>{record.hours}</span>
                  <span className={'record-item-status record-item-status-' + record.status}>
                    {record.state}
                  </span>
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }


  /**
   * When an item's select status changes
   * @param {Object} record
   * @param {Event} e
   */
  toggleSelect(record, e) {

    if (typeof this.props.toggleSelect === 'function') {
      this.props.toggleSelect(record, e.target.checked);
    }
  }
}
