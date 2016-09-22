/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import SalaryDataUtils from '../data-utils/SalaryDataUtils';


class SalaryStore extends ReduceStore {

  getInitialState() {
    return {
      basicInfo: {},
      status: 'loading',
      total: 0,
      infoList: [],
      chartData: [],
      salaryCalendar: {
        minYear: 2015,
        payrollPeriodList: []
      }
    };
  }

  reduce(state, action) {
    switch (action.type) {
    case 'get-salary':
      return assign({}, state, {
        accountList: state.accountList,
        status: 'loading'
      });
    case 'get-salary-success':
      const chartData = (action.data.payCharts || []).map((item) => {
              item.label = item.payrollChartsName;
              item.value = item.payrollTotal;
              return item;
            });

      return assign({}, state, action.data, {
        chartData,
        accountList: state.accountList,
        status: 'loaded'
      });
    case 'get-salary-fail':
      return {
        ...state,
        chartData: [],
        status: 'loaded'
      };
    case 'get-salary-calendar':
      return {
        ...state,
        infoList: [],
        chartData: []
      };
    case 'get-salary-calendar-success':
      return assign({}, state, {
        salaryCalendar: action.data.payrollData,
        accountList: null,
        picInfo: action.data.picInfo,
        status: 'loaded'
      });
    case 'change-account-list':
      return assign({}, state, {
        accountList: action.data
      });
    }
    return state;
  }
}


export default new SalaryStore(Dispatcher);
