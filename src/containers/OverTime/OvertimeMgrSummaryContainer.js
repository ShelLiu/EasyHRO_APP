/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import Form from '../../components/Form/Form.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';
import LeaveDataUtils from '../../data-utils/LeaveDataUtils';


class OvertimeMgrSummary extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	componentDidMount() {
		LeaveDataUtils.getSummaryFilters({
			type: 'FILTER_OT_SUMMARY'
		});
	}

	querySummary(page) {
		const form = new FormData(React.findDOMNode(this.refs.query));

		if ((typeof page !== 'number') || isNaN(page)) page = 1;

		form.append('page', page);

		this.page = page;

    OvertimeDataUtils.getSummaryMembers(form, page);

		this.refs.query.setState({
			submitting: false,
			disabled: false
		});
	}

  loadMore() {
    this.querySummary(this.page + 1);
  }

	render() {
		const {
			summaryList = [],
			configStatus = 'loading',
			status = 'loaded',
      otSummaryConfig
		} = this.state;

		return (
      <div>
				<Header back="manager" title={getLang('OT_SUMMARY')} />

				<Loader status={configStatus}>
					<Form className="side-gap gap-t"
								ref="query"
								action="/ot-team-summary"
								controls={otSummaryConfig}
								submitButton={{ text: getLang('SUBMIT') }}
								onSubmit={::this.querySummary}>
					</Form>
				</Loader>

        <PullLoader className='pad-b-lg gap-t-lg pad-t-lg side-gap'
                    status={status}
                    style={{paddingBottom: 80}}
                    onLoad={::this.loadMore}>
          {
            Array.isArray(summaryList) && summaryList.map((item, index) => {
              return <div key={index}>
                <div className="summary-user-info">
                  <span>{item.userInfo.items[0].firField}</span>
                  <span className="summary-user-pos">{item.userInfo.items[0].secField}</span>
                </div>
                {
                  item.summaryInfo.items.map((item, index) => {
                    return <InfoCard title={item.title} items={item.items} key={index} />;
                  })
                }
              </div>;
            })
          }
        </PullLoader>
      </div>
		);
	}
}


export default Container.create(OvertimeMgrSummary);
