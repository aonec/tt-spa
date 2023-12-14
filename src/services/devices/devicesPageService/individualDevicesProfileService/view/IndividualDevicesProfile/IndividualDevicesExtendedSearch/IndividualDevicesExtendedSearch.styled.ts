import styled from 'styled-components';

export const FirstLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.48fr 0.48fr 1fr 1fr;
  grid-gap: 16px;
`;

export const SecondLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const ResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ResourceNameWrapper = styled.div`
  margin-left: 7px;
`;

export const ThirdLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  grid-gap: 16px;
`;
