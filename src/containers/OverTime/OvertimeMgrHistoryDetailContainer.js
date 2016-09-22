/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Header from '../../components/Header/Header.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import { getItem as getLang } from '../../common/lang';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeHistoryDetail extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getHistoryDetail(this.props.routeParams.id);
	}

	render() {
		const {
			otHistoryDetail = [],
			status = 'loading'
		} = this.state;

		return (
			<div>
				<Header goBack title={getLang('OT_MGR')} />

				<Loader className='side-gap'
								status={status}>
					<RecordList recordList={otHistoryDetail} />
				</Loader>
			</div>
		);
	}
}


export default Container.create(OvertimeHistoryDetail);
