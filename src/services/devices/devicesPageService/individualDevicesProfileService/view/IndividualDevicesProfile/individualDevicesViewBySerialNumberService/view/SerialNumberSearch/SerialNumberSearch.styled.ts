import { Checkbox } from 'antd';
import styled from 'styled-components';
import { Select } from 'ui-kit/Select';
import { AscendingSortIcon, DescendingSortIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  margin-top: 16px;
  padding-bottom: 16px;
  overflow: visible;
`;

export const SearchFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr 1.5fr 3.5fr 1fr;
  grid-column-gap: 16px;
  align-items: flex-start;
`;

export const CheckboxSC = styled(Checkbox)`
  color: #272f5ae5;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  align-items: center;

  align-self: center;
`;

export const SortByWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextWrapper = styled.span`
  white-space: nowrap;
`;

export const SelectSC = styled(Select)`
  .ant-select-item-option-content {
    display: flex;
    align-items: center;
  }
`;

export const OptionSC = styled(Select.Option)``;

export const AscendingSortIconSC = styled(AscendingSortIcon)`
  transform: translateY(4px);
`;

export const DescendingSortIconSC = styled(DescendingSortIcon)`
  transform: translateY(4px);
`;
