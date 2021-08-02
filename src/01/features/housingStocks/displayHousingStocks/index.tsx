import React from 'react';
import { useStore } from 'effector-react';
import { $housingStocks, fetchHousingStocksFx } from './models';
import { Loader } from '01/components';
import styled from 'styled-components';
import OperatorPlaceholder from './assets/OperatorPlaceholder.svg';

export const HousingStocks = () => {
  const housingStocks = useStore($housingStocks);
  const pending = useStore(fetchHousingStocksFx.pending);

  const HousingStocksList = () => (
    <div>
      {housingStocks?.map((elem) => (
        <div>{elem.city}</div>
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
