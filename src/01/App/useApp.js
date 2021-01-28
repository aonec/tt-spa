import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AppContext } from '01/context';

export function useApp(){
  const { replace } = useHistory();
  const { pathname } = useLocation()

  const [state, dispatch] = React.useReducer(reducer, {}, (state) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { ...state, user };
  });

  React.useEffect(() => {
    if (pathname.match(/registration/gi)) {
      console.log(pathname.match(/registration/gi));
      return
    }

    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      replace('/login');
    }
  }, [replace]);

  return ({ children }) => (
    <AppContext.Provider
      value={{
        ...state,
        save(data){
          dispatch({ type: 'save', payload: data });
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function reducer(state, action){
  const { type = '', payload = {} } = action;
  switch (type) {
    case 'save':
      return { ...state, ...payload };
    default:
      console.error('app', type);
      return state;
  }
}

// 0 - сотрудник - ["ManagingFirmExecutor"]
// 1- админ - ["ManagingFirmAdministrator"]
// 2 - оператор - ["ManagingFirmOperator"]
