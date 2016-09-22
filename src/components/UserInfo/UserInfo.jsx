/**
 * Created by AshZhang on 15/9/28.
 */


'use strict';

import './userInfo.less';

import React, { Component } from 'react';


export default class UserInfo extends Component {

  render() {
    const {
            userInfo = {},
            action,
            simple,
            className,
            onSelectUser
          } = this.props;

    userInfo.url && (userInfo.avatar = userInfo.url);

    const userClass = 'user-info clearfix' +
                        (className ? ' ' + className : '') +
                        (simple ? ' user-info-simple' : '');

    return (
      <section className={userClass}
               onTouchTap={onSelectUser ? onSelectUser.bind(null, userInfo.id) : null}>
        <div className='user-info-main clearfix'>
          <div className='user-info-name'>{userInfo.name || userInfo.firField}</div>
          <div className='user-info-pos'>{userInfo.position || userInfo.secField}</div>
        </div>
        {
          action
            ? <a className='user-info-action' href={action.link}>{action.text}</a>
            : null
        }
      </section>
    );
  }
}
