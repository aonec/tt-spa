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
`;
