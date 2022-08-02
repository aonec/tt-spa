import { deviceMeterLineGridTemplate } from 'services/meters/apartmentIndividualDevicesMetersService/view/ApartmentIndividualDevicesMeters/ApartmentIndividualDevicesMeters.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 10px 0 10px 10px;
  display: grid;
  grid-template-columns: ${deviceMeterLineGridTemplate};
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const DeviceOptionsWrapper = styled.div`
  display: flex;
  align-items: center;

  .device-option {
    margin-left: 15px;
  }
`;
