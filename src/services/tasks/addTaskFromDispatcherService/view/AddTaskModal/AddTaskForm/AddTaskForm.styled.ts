import { TimePicker } from 'antd';
import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ArrowRightLongIcon, SearchIcon } from 'ui-kit/icons';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;
export const GridContainerExpandable = styled.div<{ isTwoColumn: boolean }>`
  display: grid;

  grid-template-columns: ${({ isTwoColumn }) =>
    isTwoColumn ? '2fr 2fr ' : '2fr 1fr 2fr'};

  grid-gap: 4px 20px;
`;

export const GridContainerAsymmetricLeft = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 4px 20px;
`;
export const GridContainerAsymmetricThreeColumn = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 4px 20px;
`;

export const GridContainerAsymmetricRight = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 4px 20px;
`;

export const ContainerWithOutline = styled.div`
  border-bottom: 1px solid #dcdee4;
  border-top: 1px solid #dcdee4;
  padding-bottom: 20px;
  margin-bottom: 16px;
  padding-top: 10px;
  margin-top: 24px;
`;

export const TextareaSC = styled(Input.TextArea)`
  padding: 10px 10px 10px 20px;
  resize: none;
  border: 1px solid #dcdee4;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
`;

export const ResourseTypeWrapper = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

export const OptionItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 32px;
  align-items: center;
  gap: 8px;
`;

export const SearchIconSc = styled(SearchIcon)`
  margin-right: 10px;
`;

export const ArrowRightLongIconDim = styled(ArrowRightLongIcon)`
  fill: #272f5a;
  fill-opacity: 0.5;
`;

export const WorkTitleWrapper = styled.div`
  display: flex;

  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
`;
export const WorkTitle = styled.div`
  color: rgba(39, 47, 90, 1);
  white-space: pre-wrap;
`;

export const WorkTitleColored = styled.div`
  color: #189ee9;
  white-space: pre-wrap;
`;

export const WorkType = styled.div`
  color: #272f5a;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export const ResourceDisconnectionAlertWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #272f5a;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  gap: 6px;
`;

export const ResourceDisconnectionDate = styled.div`
  font-weight: 500;
`;

export const SelectCaret = styled(Select)<{ isInitialSource: boolean }>`
  caret-color: transparent;

  .ant-select-selection-item {
    background-color: ${({ isInitialSource }) =>
      isInitialSource ? 'rgba(24, 158, 233, 0.2)' : 'white'};
  }
`;

export const TimePickerLarge = styled(TimePicker).attrs({
  format: 'HH:mm',
  suffixIcon: null,
  allowClear: false,
})`
  border-radius: 4px;

  padding: 8px 20px !important;

  .ant-picker-input {
    input {
      font-size: 18px;
      line-height: 32px;
      padding: 0px;
    }
  }
`;

export const TimePickerMedium = styled(TimePicker).attrs({
  format: 'HH:mm',
  suffixIcon: null,
  allowClear: true,
})`
  border-radius: 4px;

  padding: 8px 20px !important;

  .ant-picker-input {
    input {
      font-size: 16px;
      line-height: 32px;
      padding: 0px;
    }
  }
`;

export const DatePickerSc = styled(DatePicker)`
  input {
    font-size: 18px !important;
  }
`;

export const SelectExpandable = styled(Select)`
  caret-color: transparent;

  height: fit-content !important;

  .ant-select-selection-item {
    &::after {
      display: none !important;
    }
  }
`;
