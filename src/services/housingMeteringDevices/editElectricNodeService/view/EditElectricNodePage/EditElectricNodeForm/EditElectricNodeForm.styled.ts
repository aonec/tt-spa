import { Form } from 'antd';
import styled from 'styled-components';

export const FormSC = styled(Form)`
  margin-top: 15px;
  max-width: 480px;
`;

export const DeviceResourceOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-resource-name {
    margin-left: 10px;
  }
`;

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'a a'
    'b b'
    'c c'
    'd e'
    'f f';

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
`;

export const CheckingDatesWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
`;

export const SealInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #dcdee4;
`;

export const AddressInfowrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #dcdee4;

  grid-template-areas:
    'a a b c'
    'd d d d';

  #street {
    grid-area: a;
  }

  #housingStockNumber {
    grid-area: b;
  }

  #corpus {
    grid-area: c;
  }

  #city {
    grid-area: d;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
