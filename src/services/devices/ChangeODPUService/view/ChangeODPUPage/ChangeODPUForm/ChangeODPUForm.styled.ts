import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 15px;
`;

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'a a b b'
    'c c d e'
    'f f g h';

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

  #deviceInstallationDate {
    grid-area: f;
  }

  #scaleFactor {
    grid-area: g;
  }

  #bitDepth {
    grid-area: h;
  }
`;

export const DeviceResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-name {
    margin-left: 10px;
  }
`;

export const CheckingDatesWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dcdee4;
`;

export const ChangingDeviceInfoWrapper = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #dcdee4;
`;

export const ChangingReasonSelectWrapper = styled.div`
  width: calc(50% - 7.5px);
`;

export const SealInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #dcdee4;
`;
