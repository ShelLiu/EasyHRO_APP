/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import ajax, { ajaxDispatch } from '.././../common/utils/ajax';
import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);

    LeaveDataUtils.getPendingRecords({
      page: 1
    });

    this.loadMore = this.loadMore.bind(this);
  }


	/**
   * Approve all entries
   */
  approve(agreeOrNot) {
    const inputs = [].slice.call(document.querySelectorAll('[type=checkbox]'))
      .filter(check => check.checked)
      .map(check => check.value);

    ajax.post('/mss-lv-approve', {
        idList: inputs.join(),
        agreeOrNot
      })
      .then(() => {
        location.reload();
      });
  }


  /**
   * Load next page
   */
  loadMore() {
    LeaveDataUtils.getPendingRecords({
      page: this.state.pendingQuery.page + 1
    });
  }


  /**
   * Test if an item is selectable
   * @param {Object} item
   */
  select(item) {
    return true;
  }


	/**
   * Make records selectable / unselectable
   */
  toggleSelectMode() {
    dispatch({
      type: 'toggle-leave-record-selectable'
    });
  }


	/**
   * Select / unselect all
   */
  toggleSelectAll(e) {
    const selected = e.target.checked;

    [].slice.call(document.querySelectorAll('[type=checkbox]')).forEach(checkbox => {
      checkbox.checked = selected;
    });
  }


  render() {
    const { pendingRecords, selectable, status } = this.state;

    return (
      <div>
        <Header back="manager" title={getLang('PENDING')} />

        <PullLoader status={status} onLoad={this.loadMore}>
          <RecordList recordList={pendingRecords}
                      selectable={selectable && this.select}
                      url='leave-record-mgr' />
        </PullLoader>

        <Button icon='pencil' action onClick={this.toggleSelectMode} />

        <CSSTransitionGroup component='div' transitionName='bottom-up'>
          {
            selectable ?
              <nav className='tab tab-bottom leave-mgr-bottom'>
                <label className='leave-mgr-select-all'>
                  <input type="checkbox" value="" onChange={this.toggleSelectAll} />
                </label>
                <div className='row'>
                  <div className='col-1-2'>
                    <Button text={getLang('APPROVE_ALL')}
                            onTouchTap={this.approve.bind(null, true)} />
                  </div>
                  <div className='col-1-2'>
                    <Button text={getLang('REJECT_ALL')}
                            hollow
                            className='text-primary'
                            onTouchTap={this.approve.bind(null, false)} />
                  </div>
                </div>
              </nav> : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}


export default Container.create(LeaveListContainer);
