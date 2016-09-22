/**
 * Created by AshZhang on 15/12/18.
 */


import React, { Component } from 'react';
import { dispatch } from '../../dispatcher/Dispatcher';

import lang, { getItem as getLang } from '../../common/lang';
import UserDataUtils from '../../data-utils/UserDataUtils';

import Button from '../../components/Button/Button.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';

import ChangeMobile from '../Config/ChangeMobile.jsx';


export default class ConfirmMobile extends Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.state = {};
  }

  componentWillMount() {

  }

  edit() {
    this.setState({
      editting: true
    });
  }

  confirm() {
    UserDataUtils.confirmMobile();
  }

  logout() {
    dispatch({
      type: 'logout'
    });
  }

  render() {
    const props = this.props;

    return (
      (props.phone && !this.state.editting)
        ? <div className="side-gap" style={{ paddingTop: '2rem' }}>
            <form>
              <div className="col-2-3">
                <FormControl label={getLang('MOBILE')}>
                  <TextInput ref='mobile' id='mobile' name='mobile'
                             type='tel' defaultValue={props.phone} disabled />
                </FormControl>
              </div>
              <div className="col-1-3">
                <Button text={getLang('EDIT')}
                        style={{ position: 'relative', top: '1.3rem' }}
                        link
                        onTouchTap={this.edit} />
              </div>
            </form>

            <Button text={getLang('OK')}
                    onTouchTap={this.confirm} />

            <Button text={getLang('CANCEL')}
                    className="gap-t"
                    link
                    onTouchTap={this.logout} />
          </div>
        : <ChangeMobile />
    );
  }
}
