import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 15px;
`;

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'a a b b'
    'c c d e';
  grid-gap: 15px;

  #resourceType {
    grid-area: a;
  }

  #deviceType {
    grid-area: b;
  }

  #deviceModel {
    grid-area: c;
  }

  #serialNumber {
    grid-area: d;
  }

  #yearOfManufacture {
    grid-area: e;
  }
`;

export const DeviceResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-name {
    margin-left: 10px;
  }
`;
