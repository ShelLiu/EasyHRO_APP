/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher, { dispatch } from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import ProfileDataUtils from '../data-utils/ProfileDataUtils';


class ProfileStore extends ReduceStore {

  getInitialState() {
    return {
      basicInfo: null,
      //infoList: [],
      //workExp: [],
      infoList: [],
      status: 'loading',
      empId: null
    };
  }

  reduce(state, action) {

    switch (action.type) {
    case 'get-profile':
      ProfileDataUtils.getProfile(action.data);
      return assign({}, state, {
        status: 'loading'
      });

    case 'get-profile-categories':
      ProfileDataUtils.getProfileCategories(action.data);
      return assign({}, state, {
        status: 'loading'
      });

    case 'get-profile-categories-success':
      // Get first category by default
      if (action.data && action.data.baseType && action.data.baseType.length) {
        setTimeout(() => {
          dispatch({
            type: 'get-profile-category-detail',
            data: action.data.baseType[0].cmdId
          });
        }, 0);
      }
      return assign({}, state, {
        infoList: action.data.baseType,
        picInfo: action.data.picInfo,
        status: 'loaded'
      });

    case 'get-profile-category-detail':
      ProfileDataUtils.getProfileByCategory(action.data);
      return assign({}, state, {
        infoList: state.infoList.map((category) => {
          if (category.cmdId === action.data) {
            return assign({}, category, {
              status: 'loading'
            });
          } else {
            return category;
          }
        })
      });

    case 'get-profile-category-detail-success':
      return assign({}, state, {
        infoList: state.infoList.map((category) => {
          if (category.cmdId === action.data.cmdId) {
            return assign({}, category, {
              items: action.data.items,
              status: 'loaded'
            });
          } else {
            return category;
          }
        })
      });

    case 'get-profile-success':
      return assign({}, state, action.data, {
        status: 'loaded'
      });
    default:
    }

    return state;
  }
}


export default new ProfileStore(Dispatcher);
