import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { useCancelFetch } from '01/_hooks/useCancelFetch';
import { getApartments, getApartmentInfo } from '../api';
import { useStore } from 'effector-react';
import { $isClosingIndividualDeviceRequstSuccessfull } from '01/features/individualDevices/closeIndividualDevice/models';
import { toArray } from '01/features/individualDevices/addIndividualDevice/components/CheckFormValuesModal';

export const useFetchPage = (state, dispatch) => {
  const history = useHistory();
  const apatrments = useRouteMatch('/*/apartments');
  const page = useRouteMatch('/meters/apartments/:id');
  const { id } = page?.params || {};

  const presetDeviceInfo = () =>
    getApartmentInfo(id).then((data) => {
      dispatch({ type: 'success', data });
    });

  const isSuccessCloseDevice = useStore(
    $isClosingIndividualDeviceRequstSuccessfull
  );

  useEffect(() => {
    presetDeviceInfo();
    console.log('fetch');
  }, [isSuccessCloseDevice]);

  useCancelFetch();

  const isExactPage = apatrments?.isExact || page?.isExact;

  React.useEffect(() => {
    if (isExactPage && toArray(state.params || {}, false).some(Boolean)) {
      getApartments(state.params).then((data) => {
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
      presetDeviceInfo();
    }
  }, [page?.isExact]);
};
