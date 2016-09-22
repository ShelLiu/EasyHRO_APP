/**
 * Created by AshZhang on 15/10/8.
 */


import dispatcher, { dispatch } from '../dispatcher/Dispatcher';

import ajax, { ajaxDispatch } from '../common/utils/ajax';


export default {


  /**
   * Get Leave Quota
   */
  getQuota(id) {
    dispatch({
      type: 'get-leave-quota'
    });

    const params = id ? {
      empId: id
    } : null;

    ajax.get('/user-quota', params)
      .then((data) => {
        dispatch({
          type: 'get-leave-quota-success',
          data
        });
      });
  },


  /**
   * Get Leave Quota
   */
  getQuotaMembers(query = {}) {
    dispatch({
      type: 'get-quota-members'
    });

    ajax.post('/quota-team-member', query)
      .then((data) => {
        dispatch({
          type: 'get-quota-members-success',
          data: {
            list: data,
            loadMore: query.loadMore
          }
        });
      })
      .catch(() => {
        dispatch({
          type: 'get-quota-members-fail'
        });
      });
  },


  /**
   * Get leave form
   */
  getLeaveForm() {
    dispatch({
      type: 'get-leave-form'
    });

    ajax.get('/ess-lv-config')
      .then((form) => {

        ajax.getScript(form.JS_CONFIG_FILE)
          .then(() => {

            setTimeout(() => {
              dispatch({
                type: 'get-leave-form-success',
                data: form
              });
            }, 200);
          });
      });
  },


  /**
   * Get leave history employee list
   * @param {Object} [params]
   */
  getLeaveEmpList(params) {
    ajax.get('/lv-history-member', params)
      .then((res) => {
        dispatch({
          type: 'get-mgr-leave-empList-success',
          data: res
        });
      });
  },


  /**
   * Get edit info
   * @param id
   */
  getLeaveEditRecord(id) {
    dispatch({
      type: 'get-leave-form'
    });

    ajax.get('/ess-lv-edit-config', {
      id
    })
      .then((res) => {
        dispatch({
          type: 'get-leave-form-success',
          data: res
        });
      });
  },


  /**
   * Get leave history employee list
   * @param {Object} [params]
   * @param {Object} [page]
   */
  getLeaveSummaryEmpList(params, page) {
    dispatch({
      type: 'get-mgr-leave-empList'
    });

    ajax.post('/lv-team-summary', params)
      .then((res) => {
        res.page = page;

        dispatch({
          type: 'get-mgr-leave-empList-success',
          data: res
        });
      })
      .catch(() => {
        dispatch({
          type: 'get-mgr-leave-empList-fail'
        });
      });
  },


  /**
   * Get leave history employee list
   * @param {Object} query
   */
  getPendingRecords(query) {
    ajaxDispatch({
      action: 'get-lv-pending-records',
      url: '/mss-lv-todolist',
      method: 'get',
      data: query
    });
  },


  /**
   * Get leave types
   */
  getLeaveTypes() {
    ajaxDispatch({
      action: 'get-leave-types',
      url: '/leave-types',
      method: 'get'
    });
  },


  /**
   * Get an employee's leave records
   * @param {Object} [params]
   */
  getEmpLeaveRecords(params) {
    ajax.get('/ess-lv-list', params)
      .then((res) => {
        dispatch({
          type: 'get-emp-leave-records-success',
          data: res
        });
      })
      .catch(e => {
        dispatch({
          type: 'get-emp-leave-records-success',
          data: []
        });
      });
  },


  /**
   * Get an employee's leave records
   * @param {Object} [params]
   */
  getMgrLeaveHistory(params) {
    dispatch({
      type: 'get-mgr-leave-history',
      data: params
    });

    ajax.get('/lv-approve-his', params)
      .then((res) => {
        dispatch({
          type: 'get-mgr-leave-history-success',
          data: res
        });
      })
      .catch(() => {
        dispatch({
          type: 'get-mgr-leave-history-fail'
        });
      });
  },


  /**
   * Get a single leave record by id
   */
  getLeaveRecord(id) {

    ajaxDispatch({
      action: 'get-leave-record',
      url: '/ess-lv-detail/' + id,
      method: 'get'
    });
  },


  /**
   * Get a single leave record by id
   */
  getApproveRecord(id) {

    ajaxDispatch({
      action: 'get-leave-record',
      url: '/lv-approve-detail',
      method: 'get',
      data: {id}
    });
  },


  /**
   * 获取休假汇总
   * @param id
   * @param query
   */
  getLeaveSummary(id, query) {
    if (query && id) {
      query.append('id', id);
    }

    ajaxDispatch({
      action: 'get-leave-summary',
      url: '/ess-lv-summary',
      method: 'post',
      data: query || (id ? {id} : {})
    });
  },


  /**
   * 获取汇总筛选表
   */
  getSummaryFilters(data) {
    ajaxDispatch({
      action: 'get-leave-summary-filters',
      url: '/filter-config-form',
      method: 'get',
      data: data
    });
  },


  /**
   * Approve all records
   * @param {Array} records
   */
  approveAll(records) {

    ajaxDispatch({
      action: 'approve-all-leaves',
      url: '/approve-leave',
      method: 'post',
      data: records
    });
  },


  /**
   * Reject all records
   * @param {Array} records
   */
  rejectAll(records) {

    ajaxDispatch({
      action: 'reject-all-leaves',
      url: '/reject-leave',
      method: 'post',
      data: records
    });
  },


  /**
   * Reject a record
   */
  approveRecord({id, appOpinion}) {

    ajaxDispatch({
      action: 'leave-record-approve',
      url: '/mss-lv-approve',
      method: 'post',
      data: {
        id,
        appOpinion,
        agreeOrNot: true
      }
    });
  },


  /**
   * Reject a record
   */
  rejectRecord({id, appOpinion}) {

    ajaxDispatch({
      action: 'leave-record-reject',
      url: '/mss-lv-approve',
      method: 'post',
      data: {
        id,
        appOpinion,
        agreeOrNot: false
      }
    });
  },


  getFilter(companyCode) {
    ajax.get('/custom/config/' + companyCode.toUpperCase() + '_LV_STATE.json')
      .then((res) => {
        dispatch({
          type: 'get-leave-filter-success',
          data: (res && res.items) || []
        });
      });
  },


  submitForm() {
    dispatch({
      type: 'form-submitting'
    });
  },


  submitFormFail() {
    dispatch({
      type: 'form-submitting-fail'
    });
  }
};
