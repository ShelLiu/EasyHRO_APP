/**
 * Created by AshZhang on 15/10/9.
 */


'use strict';

import './pullLoader.less';

import React, { Component } from 'react';

import lang, { getItem as getLang } from '../../common/lang';


function load() {
  const pullLoader = load.pullLoader;

  if (pullLoader.props.status === 'no-more-data') return;

  const pageHeight = document.body.clientHeight,
        windowHeight = document.documentElement.clientHeight,
        scrollY = window.scrollY;

  if (windowHeight + scrollY >= pageHeight) {
    if (typeof load.pullLoader.props.onLoad === 'function') {
      load.pullLoader.props.onLoad.call(this);
    }
  }
}


export default class PullLoader extends Component {

  constructor(props) {
    super(props);
    load.pullLoader = this;
  }

  componentDidMount() {
    this.continueLoading();
  }

  componentWillUnmount() {
    this.stopLoading();
  }

  continueLoading() {
    window.addEventListener('scroll', load, false);
  }

  stopLoading() {
    window.removeEventListener('scroll', load, false);
  }

  render() {
    const { status, className = '', ...props } = this.props;

    return (
      <div className={className} {...props}>
        {this.props.children}

        <div className={'pull-loader ' + status}>
          {
            (status === 'loaded')
              ? getLang('PULL_TO_LOAD')
              : (status === 'loading')
                ? <i className='fa fa-spinner fa-pulse text-primary' />
                : <span><i className='fa fa-meh-o' /> {getLang('NO_MORE_DATA')}</span>
          }
        </div>
      </div>
    );
  }
}
