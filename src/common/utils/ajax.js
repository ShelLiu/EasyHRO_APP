/**
 * Ajax utilities
 */


'use strict';

import dispatcher, { dispatch } from '../../dispatcher/Dispatcher';


let domain = '';

let errorCallbacks = [];


/**
 * Guess dataType by url
 * @param {string} url
 * @returns {string}
 */
function parseDataType(url) {

  if (/\.html?$/.test(url)) {
    return 'html';
  } else if (/\.jsx?$/.test(url)) {
    return 'script';
  }

  return 'json';
}


/**
 * Encode an object to a query string
 * @param {Object} obj
 * @returns {string}
 */
function makeQueryString(obj) {
  let result = [];

  for (let prop in obj) if (obj.hasOwnProperty(prop)) {
    result.push(prop + '=' + encodeURIComponent(obj[prop]));
  }

  return result.length
    ? '?' + result.join('&')
    : '';
}


/**
 * Throw error when response status is not between 200 and 299
 * @param {Response} res
 * @returns {Response}
 */
function checkStatus(res) {

  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    errorCallbacks.forEach((cb) => {
      cb.call(null, res.status, res);
    });
  }
}


/**
 * Parse response according to response
 * @param {Response} res
 * @param {string} dataType
 * @returns {Response}
 */
function parseResponse(res, dataType) {
  const methodMap = {
    html: 'text',
    script: 'text',
    json: 'json'
  };

  return res[methodMap[dataType] || 'json']();
}


/**
 * If response contains `res: false`, throw an error
 * @param {*} res
 * @returns {Object|Error}
 */
function checkSuccessFalse(res) {
  if (res && (res.res !== false)) {
    return res.val !== undefined ? res.val : res;
  } else {
    errorCallbacks.forEach((cb) => {
      cb.call(null, res.status, res.error);
    });
    throw res.error;
  }
}


/**
 * General settings for `post`, `put` and `delete`
 * @param {string} url
 * @param {string} method
 * @param {Object} [data]
 * @returns {Promise}
 */
function sendData(url, method, data = {}) {
  let option = {
    method: method.toUpperCase(),
    headers: {}
  };

  if ('FormData' in window && data instanceof FormData) {

    // Form
    option.body = data;
  } else {

    // JSON
    option.headers['Content-Type'] = 'application/json';
    option.body = JSON.stringify(data);
  }

  option.credentials = 'include';

  return fetch(url, option)
    .then(checkStatus)
    .then((res) => {
      return res.json();
    })
    .then(checkSuccessFalse);
}


/**
 * API
 * @type {{get, post, put, delete}}
 */
const ajax = {


  /**
   * Set global domain property
   */
  setDomain(newDomain) {
    domain = newDomain;
  },


  /**
   * Global error callbacks
   */
  onError(callback) {
    errorCallbacks.push(callback);
  },


  // CRUD
  // ---------------------------

  get(url, data = {}) {
    let query = data ? makeQueryString(data) : '';
    let dataType = parseDataType(url);

    return fetch(domain + url + query, {
      credentials: 'include'
    })
      .then(checkStatus)
      .then((res) => {
        return parseResponse(res, dataType);
      })
      .then(checkSuccessFalse);
  },

  getScript(url) {
    return fetch(domain + url)
      .then(() => {
        const script = document.createElement('script');

        script.src = domain + url;
        document.body.appendChild(script);
      });
  },

  post(url, data = {}) {
    return sendData(domain + url, 'POST', data);
  },

  put(url, data = {}) {
    return sendData(domain + url, 'PUT', data);
  },

  delete(url, data = {}) {
    return sendData(domain + url, 'DELETE', data);
  }
};

export default ajax;

export const ajaxDispatch = function ({
    action,
    url,
    method,
    data
  }) {

  dispatch({
    type: action,
    data
  });

  return ajax[method](url, data)
    .then((res) => {
      dispatch({
        type: action + '-success',
        data: res
      });
    })
    .catch((res) => {
      dispatch({
        type: action + '-fail',
        data: res
      });
    });
};
