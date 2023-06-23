import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 12px;

  &:first-child {
    margin-top: 0;
  }
`;

export const GroupHeader = styled.div`
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Street = styled.div<{ isChecked: boolean }>`
  font-size: 16px;
  line-height: 32px;
  color: rgba(39, 47, 90, 0.9);
  user-select: none;

  font-weight: ${({ isChecked }) => (isChecked ? '500' : '400')};
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  cursor: pointer;
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;

  div {
    font-size: 16px !important;
    font-weight: 400;
  }
`;

export const SelectedAddressCount = styled.div`
  color: #686d8c;
  font-weight: 400;
  font-size: 16px;

  user-select: none;
`;

export const ChevronWrapper = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

export const ChevronSC = styled(ChevronIcon)<{ isOpen: boolean }>`
  transition: 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '90' : '-90')}deg);
`;
