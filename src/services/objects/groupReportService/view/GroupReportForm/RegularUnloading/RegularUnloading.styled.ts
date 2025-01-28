import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const Wrapper = styled.div``;

export const SwitchWrapper = styled.div`
  display: flex;
  gap: 16px;
  cursor: pointer;
  color: #272f5ae5;

  label {
    font-weight: 500;
    color: #272f5ae5;
    cursor: pointer;
  }
`;

export const SelectExpandable = styled(Select)`
  height: fit-content !important;

  .ant-select-selection-item {
    align-items: center;
  }

  .ant-select-selection-item {
    &::after {
      display: none !important;
    }
  }
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

export const UserNameWrapper = styled.div`
  display: flex;
`;
