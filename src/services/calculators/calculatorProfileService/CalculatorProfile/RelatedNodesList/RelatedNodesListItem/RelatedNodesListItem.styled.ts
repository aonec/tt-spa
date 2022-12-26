import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;

export const NodeNameWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 8px;
`;

export const NodeLink = styled(Link)`
  color: #272f5a;
`;

export const ServiceZoneText = styled.div`
  color: #272f5ab2;
`;
