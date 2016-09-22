/**
 * Created by AshZhang on 2016-4-5.
 */


import React, {Component} from 'react';
import {Container} from 'flux/utils';
import {getItem as getLang} from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Form from '../../components/Form/Form.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeEmpSummary extends Component {

  static getStores() {
    return [OvertimeStore];
  }

  static calculateState() {
    return OvertimeStore.getState();
  }

  constructor(props) {
    super(props);

    LeaveDataUtils.getSummaryFilters({
      type: 'FILTER_OT_SUMMARY'
    });
    // OvertimeDataUtils.getEmpOtSummary(this.props.routeParams.id);
  }

  querySummary() {
    OvertimeDataUtils.getEmpOtSummary(
      this.props.params.id,
      new FormData(React.findDOMNode(this.refs.query))
    );

    this.refs.query.setState({
      submitting: false,
      disabled: false
    });
  }

  render() {
    const {
      empOtSummary = [],
      configStatus = 'loading',
      status = 'loading',
      otSummaryConfig = []
    } = this.state;

    return (
        <div>
          <Header back title={getLang('OT_SUMMARY')}/>

          <Loader status={configStatus} className="side-gap gap-t">
            <Form ref="query"
                  action="/ess-ot-summary"
                  controls={otSummaryConfig}
                  submitButton={{ text: getLang('SUBMIT') }}
                  onSubmit={this.querySummary.bind(this)}>
            </Form>
          </Loader>

          <Loader status={status}
                  className='side-gap gap-t-lg pad-t-lg pad-b'
                  style={{minHeight: 0}}>
            {
              empOtSummary.map((item, index) => {
                return (
                    <div key={index}>
                      <h2 className="info-card-heading gap-b">{item.title}</h2>
                      <InfoCard items={item.items}/>
                    </div>
                );
              })
            }
          </Loader>
        </div>
    );
  }
}


export default Container.create(OvertimeEmpSummary);
