import styled from 'styled-components';

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`;

export const ResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-name {
    margin-left: 10px;
  }
`;

export const TimeWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 15px;
`;
