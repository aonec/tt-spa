import styled from 'styled-components';

export const apartmentIndividualDeviceMetersInputLineGridTemplate = `50px 260px 160px 160px 150px 30px 40px`;

export const Wrapper = styled.div`
  padding: 8px 16px;
  min-height: 80px;
  display: grid;
  grid-template-columns: ${apartmentIndividualDeviceMetersInputLineGridTemplate};
  grid-gap: 16px;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const DeviceInfoWrapper = styled.div`
  display: flex;

  .device-icon {
    width: 7px;
  }

  .device-info-text {
    margin-left: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    div {
      margin-top: 6px;
    }
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
