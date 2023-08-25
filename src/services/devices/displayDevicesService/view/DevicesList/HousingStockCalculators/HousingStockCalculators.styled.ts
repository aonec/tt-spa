import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
