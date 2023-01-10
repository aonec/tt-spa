import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Address = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 20px;
`;

export const ChevronWraper = styled.div`
  width: 16px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChevronIconSC = styled(ChevronIcon)<{ isOpen: boolean }>`
  cursor: pointer;
  transition: 0.2s;
  transform: scale(1.3) rotate(${({ isOpen }) => (isOpen ? '270' : '180')}deg);
`;

export const PersonalNumbersWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const PersonalNumberPanel = styled.div<{ isActive: boolean }>`
  border: 2px solid #189ee9;
  color: ${({ isActive }) => (isActive ? 'white' : '#272f5ae5')};
  background: ${({ isActive }) => (isActive ? '#189ee9' : 'white')};
  font-weight: 500;
  font-size: 12px;
  height: 24px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 6px;
  gap: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    ${({ isActive }) => !isActive && 'background: #189ee933;'}
  }
`;
