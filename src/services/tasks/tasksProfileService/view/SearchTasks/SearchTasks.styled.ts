import styled from 'styled-components';
import {
  StyledContainerThreeItems,
  StyledForm,
} from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';
import { Select } from 'antd';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr;
  gap: 16px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerThreeItemsMainTypes = styled(
  StyledContainerThreeItems
)`
  margin-top: 10px;
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
`;

export const StyledContainerAdressSection = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 1.19fr 1.18fr 1.18fr;
  gap: 16px;
  margin-top: 10px;
`;

export const StyledTooltiContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OverFlowSelectSC = styled(Select)<{ isShadow?: boolean }>`
  max-width: 300;

  & .ant-select-selection-item {
    text-overflow: ellipsis;
    max-width: 260px;
  }
  .ant-select-selector {
    border-radius: 4px !important;
  };

  box-shadow: ${({ isShadow = true }) =>
    isShadow ? `0 4px 7px #02004b1f` : 'none'};
`;

export const SelectSC = styled(Select)<{ isShadow?: boolean }>`
  width: 100%;
  box-shadow: ${({ isShadow = true }) =>
    isShadow ? `0 4px 7px #02004b1f` : 'none'};
  border-radius: 20px !important;
  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

export const StyledFormThreeRows = styled(StyledForm)`
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;
`;

export const StyledFormTwoRows = styled(StyledForm)`
  grid-template-rows: 1fr 1fr;
`;
