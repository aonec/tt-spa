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
`