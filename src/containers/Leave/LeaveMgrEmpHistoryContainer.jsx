/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
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

    LeaveDataUtils.getApproveRecord(this.props.routeParams.id);
  }

  render() {
    const {
      leaveRecord = [],
      status = 'loading'
    }  = this.state;

    return (
      <div>
        <Header goBack title={getLang('LEAVE_SUMMARY')} />

        <Loader className='side-gap'
                status={status}>
          <RecordList recordList={leaveRecord} />
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveListContainer);
