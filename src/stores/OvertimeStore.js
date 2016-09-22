/**
 * Created by AshZhang on 2016-4-5.
 */


import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import { getLang } from '../common/lang';


class OvertimeStore extends ReduceStore {

	getInitialState() {
		return {};
	}

	reduce(state, action) {
		switch (action.type) {
		case 'get-emp-ot-list':
			return {
				...state,
				empOtListQuery: action.data,
				status: 'loading'
			};
		case 'get-emp-ot-list-fail':
			return {
				...state,
				status: 'loaded'
			};
		case 'get-emp-ot-list-success':
			return {
				...state,
				empOtList: state.empOtListQuery.page === 1 ? action.data : state.empOtList.concat(action.data),
				status: 'loaded'
			};
		case 'get-emp-ot-record':
			return {
				...state,
				status: 'loading'
			};
		case 'get-emp-ot-record-fail':
			return {
				...state,
				status: 'loaded'
			};
		case 'get-emp-ot-record-success':
			return {
				...state,
				empOtRecord: action.data,
				status: 'loaded'
			};
		case 'get-emp-ot-summary':
			return {
				...state,
				status: 'loading'
			};
		case 'get-emp-ot-summary-success':
			return {
				...state,
				empOtSummary: action.data,
				status: 'loaded'
			};
		case 'get-ot-form':
			return {
				...state,
				status: 'loading'
			};
		case 'get-ot-form-success':
			return {
				...state,
				otForm: action.data.formConfig,
				status: 'loaded'
			};
		case 'insert-ot-form':
			return {
				...state,
				submitting: true
			};
		case 'insert-ot-form-fail':
		case 'insert-ot-form-success':
			return {
				...state,
				submitting: false,
				refreshList: action.type === 'insert-ot-form-success'
			};
		case 'get-ot-pending-records':
			return {
				...state,
				pendingQuery: action.data,
				status: 'loading'
			};
		case 'get-ot-pending-records-fail':
			return {
				...state,
				status: 'loaded'
			};
		case 'get-ot-pending-records-success':
			return {
				...state,
				pendingRecords: state.pendingQuery.page === 1 ? action.data : state.pendingRecords.concat(action.data),
				status: 'loaded'
			};
		case 'approve-ot-pending-record-success':
			return history.back();
		case 'get-ot-history-list':
			return {
				...state,
				otHistoryQuery: action.data,
				status: 'loading'
			};
		case 'get-ot-history-list-fail':
			return {
				...state,
				status: 'loaded'
			};
		case 'get-ot-history-list-success':
			return {
				...state,
				otHistoryList: state.otHistoryQuery.page === 1 ? action.data : state.otHistoryList.concat(action.data),
				status: 'loaded'
			};
		case 'get-ot-history-detail':
			return {
				...state,
				status: 'loading'
			};
		case 'get-ot-history-detail-success':
			return {
				...state,
				otHistoryDetail: action.data,
				status: 'loaded'
			};
		case 'get-ot-summary-list':
			return {
				...state,
				summaryQuery: action.data,
				status: 'loading'
			};
		case 'get-ot-summary-list-fail':
			return {
				...state,
				status: 'loaded'
			};
		case 'get-ot-summary-list-success':
			return {
				...state,
				summaryList: action.data.page !== 1
					? state.summaryList.concat(action.data)
					: action.data,
				status: 'loaded'
			};
		case 'toggle-overtime-record-selectable':
			return {
				...state,
				selectable: !state.selectable
			};
		case 'get-leave-summary-filters':
			return {
				...state,
        summaryList: [],
				configStatus: 'loading',
				status: 'loaded'
			};
		case 'get-leave-summary-filters-fail':
			return {
				...state,
				configStatus: 'loaded',
				status: 'loaded'
			};
		case 'get-leave-summary-filters-success':
			return {
        ...state,
        otSummaryConfig: action.data.formConfig,
        configStatus: 'loaded',
        status: 'loaded'
      };
		case 'get-ot-filter-success':
      return {
        ...state,
        filter: {
          items: (action.data.map ? action.data : []).map(item => {
            return {
              ...item,
              text: item[getLang() + '_text'],
              name: item.value
            };
          })
        }
      };
    default:
			return state;
		}
	}
}


export default new OvertimeStore(Dispatcher);
