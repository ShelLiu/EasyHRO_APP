/**
 * Overtime Employee List
 */


import React, { Component } from 'react';
import { Container } from 'flux/utils';

import { getItem as getLang } from '../../common/lang';

import Header from '../../components/Header/Header.jsx';
import PullLoader from '../../components/PullLoader/PullLoader.jsx';
import RecordList from '../../components/RecordList/RecordList.jsx';
import Button from '../../components/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import PageOpener from '../../components/PageOpener/PageOpener.jsx';

import OvertimeStore from '../../stores/OvertimeStore';
import OvertimeDataUtils from '../../data-utils/OvertimeDataUtils';


class OvertimeEmpList extends Component {

	static getStores() {
		return [OvertimeStore];
	}

	static calculateState() {
		return OvertimeStore.getState();
	}

	constructor(props) {
		super(props);

		OvertimeDataUtils.getEmpOtList({
			page: 1,
			state: 'approving'
		});

		OvertimeDataUtils.getFilter(JSON.parse(localStorage.getItem('companyCode')));
	}


	/**
	 * 加载更多
	 */
	loadMore() {
		const currentQuery = this.state.empOtListQuery;

		OvertimeDataUtils.getEmpOtList({
			...currentQuery,
			page: currentQuery.page + 1
		});
	}

	checkEdit(item, e) {
		if (item.stateCode === 0) {
			e.preventDefault();

			this._editId = item.id;
			OvertimeDataUtils.getOtEditRecord(item.id);
			this.openApply(e, true);
		}
	}


	toggleSelect() {}


	/**
	 * Open apply form
	 * @param e
	 * @param editMode
	 */
	openApply(e, editMode) {
		this.refs.apply.open(e);
    this.refs.pullLoader.stopLoading();

    if (editMode === true) {
			this.url = '/ess-edit-ot';
			return;
		} else {
			this.url = '/ess-insert-ot';
		}

		OvertimeDataUtils.getOtForm();
	}


	/**
	 * 新增表单
	 * - save: { submit: false}
	 * - submit: { submit: true }
	 * @param submitValue
	 */
	insert(submitValue, e) {
		const formData = this.collectFormData(submitValue);

		if (!formData) return;

		OvertimeDataUtils.insertOt(formData, this.url);

		e.preventDefault();
	}


	/**
	 * 若表单合法, 返回 formData
	 * 若不合法, 返回 false
	 * @param {boolean} submitValue
	 * @returns {boolean|*}
	 */
	collectFormData(submitValue) {
		const form = this.refs.applyForm,
			formData = new FormData(React.findDOMNode(form));

		if (!form.isValid() || window.leaveValidation && !window.leaveValidation()) return;

		formData.append('submit', submitValue);

		formData.append('verify', false);

		if (this._editId) {
			formData.append('id', this._editId);
		}

		return formData;
	}


	/**
	 * 关闭申请框, 并清除数据
	 */
	closeFormAndRefreshList() {
		const inputs = React.findDOMNode(this.refs.applyForm).querySelectorAll('input, select, textarea');

		for (let i = 0; i < inputs.length; i += 1) {
			inputs[i].value = '';
		}

		this.refs.apply.close();
    this.refs.pullLoader.continueLoading();
  }

	render() {
		const {
			empOtList = [],
			selectable,
			status = 'loading',
			filter,
			otForm,
			submitting,
			refreshList
		} = this.state;

		if (filter) {
			filter.onClickItem = (state) => {
				OvertimeDataUtils.getEmpOtList({
					page: 1,
					state
				});
			};
		}

		if (refreshList) {
			setTimeout(() => {
				location.reload();
			}, 0);
		}

		return (
			<div>
				<Header
					back
					title={getLang('MY_APPLY')}
					dropdown={filter}
				/>

				<PullLoader ref="pullLoader"
										status={status}
										onLoad={::this.loadMore}>
					<RecordList recordList={empOtList}
											url={'/my-ot/record'}
											onClickItem={::this.checkEdit}
											selectable={selectable && ::this.select}
											toggleSelect={::this.toggleSelect} />
				</PullLoader>

				<Button icon='plus' action onClick={::this.openApply} />

				<PageOpener ref='apply'>
					<Loader status={status}>
						<Form className='side-gap pad-b'
									controls={otForm}
									ref='applyForm' />

						<div className="row">
							<div className="col-1-2">
								<Button type='button'
												disabled={submitting}
												text={getLang('SAVE')}
												onClick={this.insert.bind(this, false)} />
							</div>
							<div className="col-1-2">
								<Button type='button'
												disabled={submitting}
												text={getLang('SUBMIT')}
												onClick={this.insert.bind(this, true)} />
							</div>
						</div>
					</Loader>
				</PageOpener>
			</div>
		);
	}
}


export default Container.create(OvertimeEmpList);
