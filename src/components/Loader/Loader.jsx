/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import './loader.less';

import React, { Component } from 'react';


export default class Loader extends Component {

  render() {
    const { status, className, ...props } = this.props,
          loaderClass = 'loader ' + status + ' ' + (className || '');

    return (
      <div className={loaderClass} {...props}>
        {
          (status === 'loaded')
            ? this.props.children
            : (status === 'loading')
                ? <i className='fa fa-spinner fa-pulse text-primary' />
                : <i className='fa fa-meh-o' />
        }
      </div>
    );
  }
}
