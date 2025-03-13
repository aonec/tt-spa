import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const ChevronWrapper = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #f1f1f1;
  }
`;

export const ChevronSC = styled(ChevronIcon)<{ isOpen: boolean }>`
  transition: 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '90' : '-90')}deg);
`;

export const LinkChevronSC = styled(ChevronIcon)`
  transition: 0.2s;
  transform: rotate(180deg);
`;
