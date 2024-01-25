import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { ChevronIcon } from 'ui-kit/icons';

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #f3f5f6;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 6px;
`;

export const LeftBlock = styled.div`
  display: flex;
  gap: 8px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;

export const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr;
  grid-gap: 4px 20px;
  margin-top: 16px;
`;

export const GridContainerAsymmetric = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 4px 8px;
`;

export const ButtonSC = styled(Button)`
  margin-top: 32px;
`;

export const ChevronSC = styled(ChevronIcon)<{ isOpen: boolean }>`
  transition: 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '90' : '-90')}deg);
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
