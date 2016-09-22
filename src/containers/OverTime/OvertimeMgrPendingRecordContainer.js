/**
 * Created by AshZhang on 2016-4-6.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Button from '../../components/Button/Button.jsx';
import FormControl from '../../components/FormControl/FormControl.jsx';
import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import TextInput from '../../components/TextInput/TextInput.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimePendingRecord extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		// OvertimeDataUtils.getEmpOtRecord(this.props.routeParams.id);
	}


	/**
	 * Approve a record
	 * @param {boolean} agreeOrNot
	 */
	approve(agreeOrNot) {
		OvertimeDataUtils.approveRecord({
			id: this.props.params.id,
			appOpinion: React.findDOMNode(this.refs.opinion).value,
			agreeOrNot
		});
	}


	render() {
		const {
				empOtRecord = {},
				status = 'loading'
			} = this.state,
			{
				baseInfo,
				appInfo
			} = empOtRecord;

		return (
			<div>
				<Header goBack title={getLang('MY_OT')} />

				{/*<Loader status={status} className='side-gap pad-b'>
					{
						baseInfo &&
						<div>
							<h2 className="info-card-heading gap-b">{baseInfo.title}</h2>
							<InfoCard items={baseInfo.items} />
						</div>
					}
					{
						appInfo &&
						<div>
							<h2 className="info-card-heading gap-b">{appInfo.title}</h2>
							{
								appInfo.items.map((item, index) => {
									return <InfoCard items={item} key={index} />;
								})
							}
						</div>
					}
				</Loader>*/}

				<div className='row gap-t'>
					<div className='col-1-1'>
						<FormControl label='审批意见'>
							<TextInput ref='opinion' />
						</FormControl>
					</div>
				</div>

				<div className='row'>
					<div className='col-1-2'>
						<Button text={getLang('APPROVE')}
										onTouchTap={this.approve.bind(this, true)} />
					</div>
					<div className='col-1-2'>
						<Button hollow className='text-primary'
										text={getLang('REJECT')}
										onTouchTap={this.approve.bind(this, false)} />
					</div>
				</div>
			</div>
		);
	}
}


export default Container.create(OvertimePendingRecord);
