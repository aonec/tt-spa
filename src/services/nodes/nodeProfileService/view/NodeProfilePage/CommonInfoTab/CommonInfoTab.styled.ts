import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const AddressWrapper = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;

export const NodeStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;
