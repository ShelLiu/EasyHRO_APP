/**
 * Home page
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';

import Header from '../../components/Header/Header.jsx';
import UserList from '../../components/UserList/UserList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';


class LeaveMgrQuota extends Component {

  constructor(props) {
    super(props);

    this.getTeamMembers();
    this.loadMore = this.loadMore.bind(this);
  }

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    const state = LeaveStore.getState();

    return {
      quotaTeamList: state.quotaTeamList,
      status: state.status
    };
  }

  render() {
    const { quotaTeamList, status } = this.state;

    return (
      <div>
        <Header back="manager" title={getLang('LEAVE_QUOTA')} />

        <PullLoader className='pad-b'
                    status={status}
                    onLoad={this.loadMore}>
          <UserList userList={quotaTeamList}
                    onSelectUser={this.selectUser} />
        </PullLoader>
      </div>
    );
  }


  getTeamMembers(query = {}) {
    query.page = 1;
    query.loadMore = false;

    this.page = query.page;

    LeaveDataUtils.getQuotaMembers(query);
  }


  loadMore(query = {}) {
    this.page += 1;

    LeaveDataUtils.getQuotaMembers({
      ...query,
      page: this.page,
      loadMore: true
    });
  }


  selectUser(id) {
    location.hash = '/leave-mgr/quota/' + id;
  }
}


export default Container.create(LeaveMgrQuota);
