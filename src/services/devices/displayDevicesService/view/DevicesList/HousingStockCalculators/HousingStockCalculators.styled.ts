import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const HousingStockAddressHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;

export const HousingStockAddress = styled(Link)`
  color: #272f5a;
  font-weight: 400;
  padding: 0;
  margin: 0;
  opacity: 0.9;

  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CalculatorNodesListWrapper = styled.div`
  border-top: 1px solid var(--frame);
  padding-top: 24px;
  margin-top: 7px;
`;

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow:
    0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 5px;

  padding: 16px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Header = styled.div`
  min-height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
