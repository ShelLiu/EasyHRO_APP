/**
 * Created by Sherry.Liu on 2016/10/31.
 */


'use strict';

import React, { Component } from 'react';

import './confirmButton.less';

import { getItem as getLang } from '../../common/lang';
import Button from '../Button/Button.jsx';


export default class ConfirmButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConfirm: false
    };

    this.toggleState = this.toggleState.bind(this);
  }

  render() {
    const {
        text,
        ...attr
        } = this.props;
    const {
        isConfirm
        } = this.state;

    return (
        <div>
          {
              isConfirm
              ? <div>
                <p className='gap-t-lg gap-b-lg confirm-btn-text'>{getLang('CONFIRM_MSG')}？</p>
                <Button className='gap-b' text={getLang('OK')} {...attr}/>
                <Button className='gap-b' hollow text={getLang('CANCEL')} onTouchTap={this.toggleState}/>
              </div>
              : <Button className='gap-t ' text={text} onTouchTap={this.toggleState}/>
          }
        </div>
    );
  }

  toggleState () {
    const oldState = this.state.isConfirm;
    this.setState({
      isConfirm: !oldState
    });
  }
}