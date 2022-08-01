/* eslint-disable */

import React from 'react';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../_api/tasks_page';


function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case 'reset':
      return { ...state, items: null };
    case 'success':
      return { ...state, ...data };
    default:
      console.error('tasks', type);
      return state;
  }
}

export const useTasks = (searchState) => {
  const [state, dispatch] = React.useReducer(reducer, {});
  const { 0: grouptype } = useParams();
  React.useEffect(() => {
    getTasks(grouptype, searchState).then((data) =>
      dispatch({ type: 'success', data })
    );
    return () => dispatch({ type: 'reset' });
  }, [grouptype, searchState]);
  return state;
};
