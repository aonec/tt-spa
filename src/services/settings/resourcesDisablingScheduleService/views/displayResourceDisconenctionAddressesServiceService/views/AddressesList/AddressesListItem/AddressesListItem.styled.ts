import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  align-items: center;
  grid-gap: 16px;

  color: #272f5ae5;
  font-size: 12px;
  padding: 16px;
  min-height: 48px;
  border-bottom: 1px solid #f3f5f6;
`;

export const StreetNameWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const NumbersWrapper = styled.div`
  color: #272f5a;
`;
