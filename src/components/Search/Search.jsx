/**
 * Created by AshZhang on 15/9/29.
 */


'use strict';

import './search.less';

import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Button from '../Button/Button.jsx';
import FormControl from '../FormControl/FormControl.jsx';
import TextInput from '../TextInput/TextInput.jsx';


export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.search = this.search.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  render() {
    const { opened } = this.state,
          { placeholder } = this.props;

    return (
      <div className='search'>
        {
          !opened
            ? <Button className='search-toggle' icon='search'
                      onTouchTap={this.open}></Button>
            : null
        }
        <CSSTransitionGroup component='div' transitionName='search'>
          {
            opened
              ?
                <FormControl className='search-text'>
                  <TextInput ref='search' icon='search' placeholder={placeholder}
                             onBlur={this.search} onKeyDown={this.checkEnter} />
                  <Button className='search-close' icon='times' onTouchTap={this.close}></Button>
                </FormControl>
              : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }


  /**
   * Toggle open status
   */
  open() {
    this.setState({
      opened: true
    });
  }


  /**
   * Close a search (search an empty string)
   */
  close() {
    this.search({
      target: {
        value: ''
      }
    });
    this.setState({
      opened:false
    });
  }


  /**
   * Press enter to search
   * @param e
   */
  checkEnter(e) {
    if (e.key === 'Enter') {
      this.search(e);
    }
  }


  /**
   * Search event
   * @param {Event} e
   */
  search(e) {
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch.call(this, e.target.value);
    }
  }
}