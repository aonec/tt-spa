import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HousingStockAddressHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
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

export const NodesListWrapper = styled.div`
  background: #ffffff;
  box-shadow:
    0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 5px;
  margin-bottom: 16px;

  padding: 4px 16px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Wrapper = styled.div`
  margin: 5px;
`;

export const Header = styled.div`
  min-height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddressWrapper = styled.div`
  border-bottom: 1px solid var(--frame);
  margin-bottom: 16px;
  padding-bottom: 6px;
  padding-left: 6px;
  color: rgba(39, 47, 90, 0.9);
`;
