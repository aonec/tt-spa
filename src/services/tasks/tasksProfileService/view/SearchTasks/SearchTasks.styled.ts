import { SelectSC as Select } from '01/shared/ui/Fields';
import styled from 'styled-components';
import { StyledContainerThreeItems } from 'services/devices/devicesProfileService/view/DevicesProfile/DevicesProfile.styled';

export const Wrapper = styled.div`
  display: flex;
`;

export const SelectSC = styled(Select)`
  flex: none;
  width: 300px;
  margin-left: 16px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerThreeItemsWithMarginTop = styled(StyledContainerThreeItems)`
  margin-top: 10px
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
`

export const StyledContainerAdressSection = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 1.2fr 1.2fr 1.2fr;
  gap: 16px;
`


export const StyledTooltiContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OverFlowSelectSC = styled(Select)`
  max-width: 300;

  & .ant-select-selection-item{
    text-overflow: ellipsis;
    max-width: 260px;
  }
`;