/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeMgrHistory extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getHistoryList({
			page: 1
		});
	}

	loadMore() {
		OvertimeDataUtils.getHistoryList({
			page: this.state.otHistoryQuery.page + 1
		});
	}

	render() {
		const {
			otHistoryList = [],
			status = 'loading'
		} = this.state;

		return (
			<div>
				<Header back="manager" title={getLang('HISTORY')} />

				<PullLoader className='pad-b'
										status={status}
										onLoad={::this.loadMore}>
					<RecordList recordList={otHistoryList} href={null} />
				</PullLoader>
			</div>
		);
	}
}


export default Container.create(OvertimeMgrHistory);
