/**
 * Home store
 */


import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import { getLang } from '../common/lang';

import LeaveDataUtils from '../data-utils/LeaveDataUtils';


class LeaveStore extends ReduceStore {

  getInitialState() {
    return {
      leaveForm: [],
      status: 'loading',
      leaveValidation: null,
      leaveTypes: [],
      leaveEmpList: [],
      leaveRecords: [],
      leaveRecord: {},
      selectedLeaveRecords: [],
      mgrAjax: false,
      query: {
        page: 1
      },
      quota: [],
      quotaTeamList: []
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'get-leave-quota':
      return {
        ...state,
        quota: [],
        status: 'loading'
      };
    case 'get-leave-quota-success':
      return {
        ...state,
        quota: action.data || [],
        status: 'loaded'
      };
    case 'get-lv-pending-records':
      return {
        ...state,
        pendingQuery: action.data,
        status: 'loading'
      };
    case 'get-lv-pending-records-fail':
      return {
        ...state,
        status: 'loaded'
      };
    case 'get-lv-pending-records-success':
      return {
        ...state,
        pendingRecords: state.pendingQuery.page === 1 ? action.data : state.pendingRecords.concat(action.data),
        status: 'loaded'
      };
    case 'get-quota-members':
      return {
        ...state,
        status: 'loading'
      };
    case 'get-quota-members-fail':
      return {
        ...state,
        status: 'loaded'
      };
    case 'get-quota-members-success':
      const newList = (action.data.list || []).map(item => {
        return {
          ...item,
          name: item.firField,
          position: item.secField
        };
      });
      return {
        ...state,
        quotaTeamList: action.data.loadMore ? (state.quotaTeamList || []).concat(newList) : newList,
        status: 'loaded'
      };
    case 'get-leave-form':
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-leave-form-success':
      return assign({}, state, {
        leaveForm: action.data.formConfig,
        status: 'loaded',
        leaveValidation: window.leaveValidation
      });
    case 'get-leave-types-success':
      return assign({}, state, {
        leaveTypes: action.data
      });
    case 'get-leave-filter-success':
      return {
        ...state,
        filter: {
          items: action.data.map(item => {
            return {
              ...item,
              text: item[getLang() + '_text'],
              name: item.value
            };
          })
        }
      };
    case 'get-emp-leave-records':
      const newQuery = assign(state.query, action.data);

      if (action.data && action.data.loadMore) {
        if (state.status === 'loading') return state;

        newQuery.page += 1;
      }

      LeaveDataUtils.getEmpLeaveRecords(newQuery);
      return assign({}, state, {
        status: 'loading',
        query: newQuery
      });
    case 'get-mgr-leave-empList':
      return {
        ...state,
        status: 'loading'
      };
    case 'get-mgr-leave-empList-fail':
      return {
        ...state,
        status: 'loaded'
      };
    case 'get-mgr-leave-empList-success':
      return assign({}, state, {
        leaveEmpList: action.data.page !== 1
          ? state.leaveEmpList.concat(action.data)
          : action.data,
        status: (action.data.length < 16)
          ? 'no-more-data'
          : 'loaded'
      });
    case 'form-submitting':
      return {
        ...state,
        formSubmitting: true
      };
    case 'form-submitting-fail':
      return {
        ...state,
        formSubmitting: false
      };
    case 'get-emp-leave-records-success':
      const data = action.data;

      return assign({}, state, {
        leaveRecords: state.query.loadMore ? state.leaveRecords.concat(data) : data,
        status: (data.length < state.query.pageSize)
          ? 'no-more-data'
          : 'loaded'
      });
    case 'get-mgr-leave-history-success':
      return assign({}, state, {
        status: 'loaded',
        leaveRecords: state.query.page === 1 ? action.data : state.leaveRecords.concat(action.data)
      });
    case 'get-mgr-leave-history':
      const newQueryHistory = assign(state.query, action.data);

      return assign({}, state, {
        status: 'loading',
        query: newQueryHistory
      });
    case 'get-mgr-leave-history-fail':
      return {
        ...state,
        status: 'loaded'
      };
    case 'get-leave-record':
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-leave-record-success':
      return assign({}, state, {
        leaveRecord: action.data,
        status: 'loaded'
      });
    case 'get-leave-summary':
      return assign({}, state, {
        status: 'loading'
      });
    case 'get-leave-summary-success':
      return assign({}, state, {
        leaveSummary: action.data,
        status: 'loaded'
      });
    case 'toggle-leave-record-selectable':
      return assign({}, state, {
        selectable: !state.selectable
      });
    case 'toggle-leave-record-select-status':
      if (action.data.isSelected && (state.selectedLeaveRecords.indexOf(action.data.id) === -1)) {
        state.selectedLeaveRecords.push(action.data.id);
      }
      if (!action.data.isSelected && (state.selectedLeaveRecords.indexOf(action.data.id) !== -1)) {
        state.selectedLeaveRecords = state.selectedLeaveRecords.filter((item) => {
          return item !== action.data.id;
        });
      }
      return assign({}, state);
    case 'approve-all-leaves':
    case 'reject-all-leaves':
      return assign({}, state, {
        mgrAjax: true
      });
    case 'approve-all-leaves-success':
    case 'reject-all-leaves-success':
      location.reload();
      return state;
    case 'toggle-leave-record-select-all':
      state.selectedLeaveRecords = [];
      state.leaveRecords.forEach((item) => {
        if (item.status === 2) {
          item.checked = action.data;
          state.selectedLeaveRecords.push(item.id);
        }
      });
      return assign({}, state);
    case 'leave-record-approve-success':
    case 'leave-record-reject-success':
      history.back();
      return state;
    case 'get-leave-summary-filters':
      return {
        ...state,
        leaveEmpList: [],
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
      return assign({}, state, {
        leaveSummaryConfig: action.data.formConfig,
        configStatus: 'loaded',
        status: 'loaded'
      });
    }

    return state;
  }
}


export default new LeaveStore(Dispatcher);
