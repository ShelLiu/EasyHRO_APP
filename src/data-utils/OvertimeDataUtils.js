/**
 * Created by AshZhang on 2016-4-5.
 */


import { dispatch } from '../dispatcher/Dispatcher';

import ajax, { ajaxDispatch } from '../common/utils/ajax';


export default {

	getEmpOtList(data) {
		ajaxDispatch({
			action: 'get-emp-ot-list',
			url: '/ess-ot-list',
			method: 'get',
			data: data
		});
	},

	getEmpOtRecord(id) {
		ajaxDispatch({
			action: 'get-emp-ot-record',
			url: '/ess-ot-detail',
			method: 'get',
			data: {
				id
			}
		});
	},


	/**
	 * Get edit info
	 * @param id
	 */
	getOtEditRecord(id) {
		dispatch({
			type: 'get-ot-form'
		});

		ajax.get('/ess-ot-edit-config', {
			id
		})
			.then((res) => {
				dispatch({
					type: 'get-ot-form-success',
					data: res
				});
			});
	},

	getOtForm() {
		dispatch({
			type: 'get-ot-form'
		});

		ajax.get('/ess-ot-config')
			.then((form) => {

				ajax.getScript(form.JS_CONFIG_FILE)
					.then(() => {

						dispatch({
							type: 'get-ot-form-success',
							data: form
						});
					});
			});
	},

	insertOt(formData, url) {
		ajaxDispatch({
			action: 'insert-ot-form',
			url: url,
			method: 'post',
			data: formData
		})
			.catch(e => {
				console.log(e);
			});
	},

	getEmpOtSummary(id, query) {
		if (query && id) {
			query.append('id', id);
		}

		ajaxDispatch({
			action: 'get-emp-ot-summary',
			url: '/ess-ot-summary',
			method: 'post',
			data: query || (id ? { id } : {})
		});
	},

	getPendingRecords(query) {
		ajaxDispatch({
			action: 'get-ot-pending-records',
			url: '/mss-ot-todolist',
			method: 'get',
			data: query
		});
	},

	approveRecord(data) {
		ajaxDispatch({
			action: 'approve-ot-pending-record',
			url: '/mss-ot-approve',
			method: 'post',
			data
		});
	},

	getHistoryList(query) {
		ajaxDispatch({
			action: 'get-ot-history-list',
			url: '/ot-approve-his',
			method: 'get',
			data: query
		});
	},

	getHistoryDetail(id) {
		ajaxDispatch({
			action: 'get-ot-history-detail',
			url: '/ot-approve-otdetail',
			method: 'get',
			data: {
				id
			}
		});
	},

	getSummaryMembers(params, page) {
		dispatch({
			type: 'get-ot-summary-list'
		});

		ajax.post('/ot-team-summary', params)
			.then((res) => {
				res.page = page;

				dispatch({
					type: 'get-ot-summary-list-success',
					data: res
				});
			})
			.catch(() => {
				dispatch({
					type: 'get-ot-summary-list-fail'
				});
			});
	},

	getFilter(companyCode) {
		ajax.get('/custom/config/' + companyCode + '_LV_STATE.json')
			.then((res) => {
				dispatch({
					type: 'get-ot-filter-success',
					data: (res && res.items)
				});
			});
	},

	submitForm() {
		dispatch({
			type: 'form-submitting'
		});
	}
};
