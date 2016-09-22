/**
 * Home page
 */


import './leave-mgr.less';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Button from '../../components/Button/Button.jsx';
import LeaveList from './LeaveList.jsx';

import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveMgr extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  render() {
    const { selectable, mgrAjax } = this.state;

    return (
      <div className='bottom-gap'>
        <Header back title={getLang('LEAVE_MGR')} iconRight={selectable ? 'check' : 'edit'}
                onTapRight={this.toggleEnterMode} />

        <LeaveList {...this.state}
                   mgr={true}
                   defaultFilter={{ type: 'status', choice: 'pending' }}
                   toggleSelect={this.toggleSelect}></LeaveList>

        <CSSTransitionGroup component='div' transitionName='bottom-up'>
          {
            selectable ?
              <nav className='tab tab-bottom leave-mgr-bottom'>
                <label className='leave-mgr-select-all'><input type='checkbox' onChange={this.toggleSelectAll} /></label>
                <div className='row'>
                  <div className='col-1-2'>
                    <Button text={getLang('APPROVE_ALL')} disabled={mgrAjax} onTouchTap={this.approveAll}></Button>
                  </div>
                  <div className='col-1-2'>
                    <Button text={getLang('REJECT_ALL')} hollow disabled={mgrAjax} className='text-primary' onTouchTap={this.rejectAll}></Button>
                  </div>
                </div>
              </nav> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }


  /**
   * Make leave records selectable
   */
  toggleEnterMode() {
    dispatch({
      type: 'toggle-leave-record-selectable'
    });
  }


  /**
   * Toggle an item's select status
   * @param {Object} item
   * @param {boolean} isSelected
   */
  toggleSelect(item, isSelected) {
    dispatch({
      type: 'toggle-leave-record-select-status',
      data: {
        id: item.id,
        isSelected
      }
    });
  }


  /**
   * Select / Unselect all records
   * @param {Event} e
   */
  toggleSelectAll(e) {
    [].slice.call(document.querySelectorAll('[type=checkbox]')).forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });

    dispatch({
      type: 'toggle-leave-record-select-all',
      data: e.target.checked
    });
  }


  approveAll() {
    const selected = LeaveStore.getState().selectedLeaveRecords;

    if (selected.length) {
      LeaveDataUtils.approveAll(selected);
    }
  }


  rejectAll() {
    const selected = LeaveStore.getState().selectedLeaveRecords;

    if (selected.length) {
      LeaveDataUtils.rejectAll(selected);
    }
  }
}


export default Container.create(LeaveMgr);