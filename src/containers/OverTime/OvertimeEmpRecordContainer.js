/**
 * Created by AshZhang on 2016-4-5.
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeEmpRecord extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getEmpOtRecord(this.props.routeParams.id);
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

				<Loader status={status} className='side-gap gap-t-lg pad-b'>
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
				</Loader>
			</div>
		);
	}
}


export default Container.create(OvertimeEmpRecord);
