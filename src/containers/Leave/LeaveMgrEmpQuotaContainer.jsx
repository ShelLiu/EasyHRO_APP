/**
 * Home page
 */


'use strict';

import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import { getItem as getLang } from '../../common/lang';
import LeaveStore from '../../stores/LeaveStore';

import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveQuota extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);
    LeaveDataUtils.getQuota(this.props.params.id);
  }

  render() {
    const { quota = [], status } = this.state;

    return (
      <div>
        <Header goBack title={getLang('LEAVE_QUOTA')} />

        <div className="side-gap gap-t gap-b">

          <Loader status={status}>
            {
              quota.map((card, index) => {
                return <div className="gap-t" key={index}>
                  <h2 className="info-card-heading gap-b">{card.title}</h2>
                  <InfoCard items={card.items} />
                </div>;
              })
            }
          </Loader>
        </div>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);
