import React from 'react';
import styled from 'styled-components';
import OperatorPlaceholder from './assets/OperatorPlaceholder.svg';

export const HousingStocks = () => {
  return <StartInputForDisplayImage />;
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
