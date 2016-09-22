/**
 * Home store
 */


'use strict';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';

import ProfileDataUtils from '../data-utils/ProfileDataUtils';


class TeamProfileStore extends ReduceStore {

  getInitialState() {
    return {
      empList: [],
      status: 'loading',
      query: {
        page: 1,
        pageSize: 20,
        sort: 'name',
        order: 'ASC'
      }
    };
  }

  reduce(state, action) {

    switch (action.type) {

    case 'get-team-members':
      const newQuery = assign(state.query, action.data);

      if (action.data && action.data.loadMore) {
        if (newQuery.status === 'loading') return state;

        newQuery.page += 1;
      }

      ProfileDataUtils.getTeamMembers(newQuery);
      return assign({}, state, {
        query: newQuery,
        status: 'loading'
      });

    case 'get-team-members-success':
      const data = (action.data || []).map(item => {
        return {
          ...item,
          name: item.firField,
          position: item.secField
        };
      });

      return assign({}, state, {
        empList: state.query.loadMore ? (state.empList || []).concat(data) : data,
        status: (data.length < state.query.pageSize)
                  ? 'no-more-data'
                  : 'loaded'
      });
    default:
    }

    return state;
  }
}


export default new TeamProfileStore(Dispatcher);