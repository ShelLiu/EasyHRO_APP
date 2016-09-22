/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import './userList.less';

import React, { Component } from 'react';

import UserInfo from '../UserInfo/UserInfo.jsx';


export default class UserList extends Component {

  render() {
    const { userList, onSelectUser } = this.props;

    return (
      <div className='user-list'>
        {
          userList.map((userInfo, index) => {
            return <UserInfo key={index} userInfo={userInfo} simple onSelectUser={onSelectUser} />;
          })
        }
      </div>
    );
  }
}