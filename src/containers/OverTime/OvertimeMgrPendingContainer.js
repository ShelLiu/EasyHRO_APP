/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';
import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import ajax, { ajaxDispatch } from '.././../common/utils/ajax';
import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeMgrPending extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getPendingRecords({
			page: 1
		});
	}


	/**
	 * Approve all entries
	 */
	approve(agreeOrNot) {
		const inputs = [].slice.call(document.querySelectorAll('[type=checkbox]'))
			.filter(check => check.checked)
			.map(check => check.value);

		ajax.post('/mss-ot-approve', {
				idList: inputs.join(),
				agreeOrNot
			})
			.then(() => {
				location.reload();
			});
	}


	/**
	 * Load more
	 */
	loadMore() {
		OvertimeDataUtils.getPendingRecords({
			page: this.state.pendingQuery.page + 1
		});
	}


	/**
	 * Test if an item is selectable
	 * @param {Object} item
	 */
	select(item) {
		return true;
	}


	/**
	 * Make records selectable / unselectable
	 */
	toggleSelectMode() {
		dispatch({
			type: 'toggle-overtime-record-selectable'
		});
	}


	/**
	 * Select / unselect all
	 */
	toggleSelectAll(e) {
		const selected = e.target.checked;

		[].slice.call(document.querySelectorAll('[type=checkbox]')).forEach(checkbox => {
			checkbox.checked = selected;
		});
	}


	render() {
		const {
			pendingRecords = [],
			status = 'loading',
			selectable
		} = this.state;

		return (
			<div>
				<Header back="manager" title={getLang('PENDING')} />

				<PullLoader status={status}
										onLoad={::this.loadMore}>
					<RecordList recordList={pendingRecords}
											selectable={selectable && this.select}
											url='ot-record-mgr' />
				</PullLoader>

				<Button icon='pencil' action onClick={this.toggleSelectMode} />

				<CSSTransitionGroup component='div' transitionName='bottom-up'>
					{
						selectable ?
							<nav className='tab tab-bottom leave-mgr-bottom'>
								<label className='leave-mgr-select-all'>
									<input type="checkbox" value="" onChange={this.toggleSelectAll} />
								</label>
								<div className='row'>
									<div className='col-1-2'>
										<Button text={getLang('APPROVE_ALL')}
														onTouchTap={this.approve.bind(null, true)} />
									</div>
									<div className='col-1-2'>
										<Button text={getLang('REJECT_ALL')}
														hollow
														className='text-primary'
														onTouchTap={this.approve.bind(null, false)} />
									</div>
								</div>
							</nav> : null
					}
				</CSSTransitionGroup>
			</div>
		);
	}
}


export default Container.create(OvertimeMgrPending);
