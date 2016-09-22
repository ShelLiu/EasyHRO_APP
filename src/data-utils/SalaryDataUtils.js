/**
 * Created by AshZhang on 15/10/8.
 */


'use strict';

import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax, { ajaxDispatch } from '../common/utils/ajax';


export default {


  /**
   * Get user salary
   * @param {number} year
   * @param {number} month
   * @param {string} accName
   */
  getSalary({year, month, accName}) {
    ajaxDispatch({
      action: 'get-salary',
      url: '/salary',
      method: 'post',
      data: {
        salaryYear: year,
        salaryMonth: month,
        salaryCode: accName
      }
    });
  },


  /**
   * Get salary calendar
   */
  getSalaryCalendar() {
    ajaxDispatch({
      action: 'get-salary-calendar',
      url: '/calendar-salary',
      method: 'get'
    });
  }
};