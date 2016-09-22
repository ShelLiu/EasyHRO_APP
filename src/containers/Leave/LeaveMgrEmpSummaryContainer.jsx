/**
 * Home page
 */


import React, { Component } from 'react';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';
import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import LeaveStore from '../../stores/LeaveStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class LeaveListContainer extends Component {

  static getStores() {
    return [LeaveStore];
  }

  static calculateState() {
    return LeaveStore.getState();
  }

  constructor(props) {
    super(props);

    // LeaveDataUtils.getLeaveSummary(this.props.params.id);
    LeaveDataUtils.getSummaryFilters({
      type: 'FILTER_LV_SUMMARY'
    });
  }

  querySummary() {
    LeaveDataUtils.getLeaveSummary(
      this.props.params.id,
      new FormData(React.findDOMNode(this.refs.query))
    );

    this.refs.query.setState({
      submitting: false,
      disabled: false
    });
  }

  render() {
    const { leaveSummary = [], status, leaveSummaryConfig = [] } = this.state;

    return (
      <div>
        <Header goBack title={getLang('LEAVE_SUMMARY')} />

        <Form className="side-gap"
              ref="query"
              action="/ess-lv-summary"
              controls={leaveSummaryConfig}
              submitButton={{ text: getLang('SUBMIT') }}
              onSubmit={this.querySummary.bind(this)}>
        </Form>

        <Loader status={status} className='side-gap gap-t-lg' onLoad={this.loadMore}>
          {
            leaveSummary.map((card, index) => {
              return <InfoCard {...card} key={index} />;
            })
          }
        </Loader>
      </div>
    );
  }
}


export default Container.create(LeaveListContainer);
