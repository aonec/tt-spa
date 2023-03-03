import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const HousingStockWrapper = styled.div`
  border-top: 1px solid #f3f5f6;
  padding: 16px 16px 0 16px;
  height: 400px;
`;

export const Header = styled.div`
  display: flex;
  gap: 16px;
`;

export const Address = styled.div`
  font-weight: 600;
  color: rgba(39, 47, 90, 0.9);
  font-size: 16;
`;

export const City = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.6);
`;

export const ChevronIconSC = styled(ChevronIcon)`
  transform: translateY(3px);
  cursor: pointer;
`;
