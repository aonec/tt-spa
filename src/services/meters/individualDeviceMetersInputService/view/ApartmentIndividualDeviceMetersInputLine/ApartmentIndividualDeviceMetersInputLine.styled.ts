import styled from 'styled-components';

export const apartmentIndividualDeviceMetersInputLineGridTemplate = `35px 190px 160px 160px 100px 47px 30px`;

export const Wrapper = styled.div`
  padding: 10px 0 10px 10px;
  min-height: 80px;
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};
  grid-gap: 15px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const DeviceInfoWrapper = styled.div`
  display: flex;

  .device-icon {
    width: 7px;
    transform: translateY(5px);
  }

  .device-info-text {
    margin-left: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ConsumptionWrapper = styled.div`
  transform: translateY(-8px);

  .consumption-value {
    height: 32px;
    display: flex;
    align-items: center;
  }
`;
