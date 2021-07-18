import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { useCancelFetch } from '01/_hooks/useCancelFetch';
import { getApartmetns, getApartmentInfo } from '../api';

export const useFetchPage = (state, dispatch) => {
  const history = useHistory();
  const apatrments = useRouteMatch('/*/apartments');
  const page = useRouteMatch('/meters/apartments/:id');
  useCancelFetch();

  const isExactPage = apatrments?.isExact || page?.isExact;

  React.useEffect(() => {
    if (isExactPage && state.params) {
      getApartmetns(state.params).then((data) => {
        dispatch({ type: 'success', data });

        if (state.meters || state.apartInfo) {
          dispatch({ type: 'clear_apartInfo' });
          history.push('/meters/apartments');
        }
      });
    }
  }, [state.params, apatrments?.isExact]);

  React.useEffect(() => {
    if (isExactPage && page?.isExact) {
      const { id } = page?.params;
      getApartmentInfo(id).then((data) => {
        dispatch({ type: 'success', data });
      });
    }
  }, [page?.isExact]);
};
