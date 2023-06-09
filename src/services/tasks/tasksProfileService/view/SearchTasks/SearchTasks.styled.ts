import styled from 'styled-components';
import { StyledContainerThreeItems } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import { Select } from 'ui-kit/Select';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr;
  gap: 16px;
`;

export const StyledContainerThreeItemsMainTypes = styled(
  StyledContainerThreeItems,
)`
  margin-top: 10px;
  grid-template-columns: 4fr 4fr 4fr;
  grid-column-gap: 16px;
`;

export const StyledContainerAdressSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const StyledTooltiContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;

  label {
    color: #272f5ab2;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const OverFlowSelectSC = styled(Select)`
  max-width: 300;

  & .ant-select-selection-item {
    text-overflow: ellipsis;
    max-width: 260px;
  }
  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

export const StyledFormTwoRows = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  gap: 2px;
`;

export const StyledFormThreeRows = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  gap: 5px;
`;

export const ToExecutionWrapper = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  gap: 2px;
`;

export const ApartmentNumberWrapper = styled.div`
  margin-left: 16px;
  width: 110px;
`;
