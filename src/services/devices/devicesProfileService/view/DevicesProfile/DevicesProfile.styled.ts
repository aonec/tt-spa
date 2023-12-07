import { DatePicker } from 'antd';
import styled from 'styled-components';
const { RangePicker } = DatePicker;

export const Wrapper = styled.div`
  max-width: 1060px;
`;

export const StyledContainerFourItems = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 1.9fr 1.9fr;
  gap: 15px;
`;

export const StyledRangePicker = styled(RangePicker)<{ isShadow?: boolean }>`
  height: 32px;
  width: 100%;
  box-shadow: ${({ isShadow = true }) =>
    isShadow ? `0 4px 7px #02004b1f` : 'none'};
`;

export const StyledForm = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderText = styled.h1`
  font-weight: 300;
  margin-bottom: 16;
`;
