import styled from 'styled-components';

export const AdditionalAddress = styled.div`
  display:flex;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  margin-top: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: min-content;
  max-width: 600px;
`;

export const AdditionalAddressDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: min-content;
  max-width: 300px;
`;

export const MainAddressWrapper = styled.div`
  font-weight: 500;
`;
