import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Loader as TTLoader } from '01/components';
import { useStore } from 'effector-react';
import {
  fetchApartmentFx,
  $apartment,
} from '01/features/apartments/displayApartment/models';

const Loader = styled(TTLoader)`
  margin-top: 10px;
`;

export const Apartments = () => {
  const loading = useStore(fetchApartmentFx.pending);
  const apartment = useStore($apartment);
  const history = useHistory();

  useEffect(() => {
    if (apartment?.id) history.push(`/meters/apartments/${apartment.id}`);
  }, [apartment]);

  return loading ? <Loader show size={32} /> : <></>;
};
