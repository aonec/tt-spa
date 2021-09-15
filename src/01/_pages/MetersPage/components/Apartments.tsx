import React from 'react';
import styled from 'styled-components';
import { Loader as TTLoader } from '01/components';
import { useStore } from 'effector-react';
import { fetchApartmentFx } from '01/features/apartments/displayApartment/models';

const Loader = styled(TTLoader)`
  margin-top: 10px;
`;

export const Apartments = () => {
  const loading = useStore(fetchApartmentFx.pending);

  return loading ? <Loader show size={32} /> : <></>;
};
