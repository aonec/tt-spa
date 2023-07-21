import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { ChevronIcon, PencilIcon } from 'ui-kit/icons';

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
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #272f5acc;
  }
`;

export const ChevronWraper = styled.div`
  width: 16px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChevronIconSC = styled(ChevronIcon)<{ opened: boolean }>`
  cursor: pointer;
  transition: 0.2s;
  transform: scale(1.3) rotate(${({ opened }) => (opened ? '270' : '180')}deg);
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

  svg {
    transform: translateY(-1px);

    path {
      ${({ isActive }) => isActive && 'fill: white;'}
    }
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



export const ExtraInfoWrapper = styled.div`
  margin-top: 12px;
  border-top: 1px solid #dcdee4;
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
`;

export const ExtraInfoText = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 12px;
`;

export const AccountOpeningDate = styled.span`
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
`;

export const AdditionalHeaderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
