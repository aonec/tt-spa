import React from 'react';

export const useLoginState = (props) => {
  const [state, dispatch] = React.useReducer(reducer, {});
  return [state, dispatch];
};

function reducer(state, action) {}
