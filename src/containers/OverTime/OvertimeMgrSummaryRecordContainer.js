/**
 * Created by AshZhang on 2016-4-5.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Form from '../../components/Form/Form.jsx';

import { getItem as getLang } from '../../common/lang';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class OvertimeEmpSummary extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		// OvertimeDataUtils.getEmpOtSummary(this.props.routeParams.id);
    LeaveDataUtils.getSummaryFilters({
      type: 'FILTER_OT_SUMMARY'
    });
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
			status = 'loading',
      otSummaryConfig = []
    } = this.state;

		return (
			<div>
				<Header goBack title={getLang('OT_MGR')} />

				<Form className="side-gap"
							ref="query"
							action="/ess-lv-summary"
							controls={otSummaryConfig}
							submitButton={{ text: getLang('SUBMIT') }}
							onSubmit={this.querySummary.bind(this)}>
				</Form>

				<Loader status={status} className='side-gap gap-t pad-b'>
					{
						empOtSummary.map((item, index) => {
							return (
								<div key={index}>
									<h2 className="info-card-heading gap-b">{item.title}</h2>
									<InfoCard items={item.items} />
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
