/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import { getItem as getLang } from '../common/lang';
import Header from '../components/Header/Header.jsx';
import PullLoader from '../components/PullLoader/PullLoader.jsx';
import Search from '../components/Search/Search.jsx';
import Sorter from '../components/Sorter/Sorter.jsx';
import UserList from '../components/UserList/UserList.jsx';

import TeamProfileStore from '../stores/TeamProfileStore';


const sortItems = [
  {
    text: getLang('NAME'),
    name: 'name',
    order: 'ASC'
  },
  {
    text: getLang('POSITION'),
    name: 'position',
    order: 'DESC'
  }
];

class TeamProfile extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.sort = this.sort.bind(this);
    this.getTeamMembers();
  }

  static getStores() {
    return [TeamProfileStore];
  }

  static calculateState() {
    return TeamProfileStore.getState();
  }

  render() {
    const {status, empList} = this.state;

    return (
      <div>
        <Header goBack title={getLang('TEAM_PROFILE')} dropdown>
          <Search placeholder={getLang('ENTER_USER_SEARCH')} onSearch={this.search}></Search>
        </Header>

        {/*<Sorter items={sortItems} defaultItem='name' onSort={this.sort} />*/}

        <PullLoader status={status} className='pad-b' onLoad={this.loadMore}>
          <UserList userList={empList} onSelectUser={this.selectUser} />
        </PullLoader>
      </div>
    );
  }

  /**
   * Get team members
   * @param {Object} [query]
   */
  getTeamMembers(query = {}) {
    query.page = 1;
    query.pageSize = 16;
    query.loadMore = false;
    dispatch({
      type: 'get-team-members',
      data: query
    });
  }


  /**
   * Load next page
   */
  loadMore() {
    dispatch({
      type: 'get-team-members',
      data: {
        loadMore: true
      }
    });
  }


  /**
   * Go to employee profile page
   * @param id
   */
  selectUser(id) {
    location.hash = '/team-profile/profile/' + id;
  }


  /**
   * Search employee
   * @param {string} query
   */
  search(query) {
    this.getTeamMembers({
      search: query
    });
  }


  /**
   * Sort
   * @param {string} name
   * @param {string} order
   */
  sort(name, order) {
      this.getTeamMembers({
          sort: name,
          order
      });
    }
}


export default Container.create(TeamProfile);
