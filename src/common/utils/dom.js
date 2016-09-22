/**
 * DOM search and manipulation
 */


'use strict';


export default {


  /**
   * Test whether `parent` contains or equals to `child`
   * @param {HTMLElement} parent
   * @param {HTMLElement} child
   * @returns {boolean}
   */
  contains(parent, child) {

    do  {
      if (parent === child) return true;
      child = child.parentNode;
    } while (child);

    return false;
  }
};