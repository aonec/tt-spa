import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { ChevronIcon, PencilIcon } from 'ui-kit/icons';

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

export const InfoPanel = styled.div`
  margin-top: 16px;
  background: #189ee916;
  border-radius: 4px;
  padding: 12px;
`;

export const InfoPanelLabel = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;

  &:after {
    content: ':';
  }
`;

export const BaseInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const FirmWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #272f5ae5;

  div {
    font-weight: 600;
    font-size: 12px;
    transform: translateY(1px);
  }
`;

export const FirmsLine = styled.div`
  margin: 2px;
  border-left: 1px solid #272f5a52;
  margin-left: 5px;
  padding: 4px 14px;
`;

export const ManagementFirmInfo = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #272f5ae5;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Comment = styled.div`
  color: #272f5ae5;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 25, 0.06);
  }
`;

export const TextareaSC = styled(Input.TextArea)`
  border: 1px solid #189ee9;
  border-radius: 4px;
`;

export const CommentFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;
