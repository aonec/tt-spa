import React from 'react';
import { useStore } from 'effector-react';
import {
  $housingStocks,
  fetchHousingStocksFx,
  HousingStocksGate,
} from './models';
import { Loader } from '01/components';
import styled from 'styled-components';
import OperatorPlaceholder from './assets/OperatorPlaceholder.svg';

export const HousingStocks = () => {
  const housingStocks = useStore($housingStocks);
  const pending = useStore(fetchHousingStocksFx.pending);

  const HousingStocksList = () => (
    <>
      {housingStocks?.map((elem) => (
        <div>{elem.city}</div>
      ))}
    </>
  );

  return (
    <>
      {/* <HousingStocksGate /> */}
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
  <ImageContainer>
    <img src={OperatorPlaceholder} alt="OperatorPlaceholder" />
  </ImageContainer>
);
