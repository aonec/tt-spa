import React from 'react';
import { useStore } from 'effector-react';
import { $housingStocks, fetchHousingStocksFx } from './models';
import { Loader } from '01/components';
import styled from 'styled-components';
import OperatorPlaceholder from './assets/OperatorPlaceholder.svg';
import { StyledObject } from '01/_pages';

export const HousingStocks = () => {
  const housingStocks = useStore($housingStocks);
  const pending = useStore(fetchHousingStocksFx.pending);

  const HousingStocksList = () => (
    <div style={{ width: '100%', maxWidth: '960px' }}>
      {housingStocks?.map((elem) => (
        <StyledObject {...elem} />
      ))}
    </div>
  );

  return (
    <>
      {pending ? (
        <Loader show={true} />
      ) : housingStocks?.length ? (
        <HousingStocksList />
      ) : (
        <StartInputForDisplayImage />
      )}
    </>
  );
};

const ImageContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 550px;
`;

export const StartInputForDisplayImage = () => (
  <ImageContainer style={{ zIndex: 1 }}>
    <img src={OperatorPlaceholder} alt="OperatorPlaceholder" />
  </ImageContainer>
);
