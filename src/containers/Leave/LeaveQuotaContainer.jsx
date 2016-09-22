/**
 * Home page
 */


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

  componentDidMount() {
    LeaveDataUtils.getQuota();
  }

  render() {
    const { quota = [], status } = this.state;

    return (
      <div>
        <Header back title={getLang('LEAVE_QUOTA')} />

        <Loader status={status} className="side-gap gap-t gap-b">
          {
            (quota.map ? quota : []).map((card, index) => {
              return <div className="gap-t" key={index}>
                <h2 className="info-card-heading gap-b">{card.title}</h2>
                <InfoCard items={card.items} />
              </div>;
            })
          }
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveQuota);
