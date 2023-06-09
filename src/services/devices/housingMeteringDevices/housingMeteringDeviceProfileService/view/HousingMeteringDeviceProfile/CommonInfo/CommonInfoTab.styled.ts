import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Address = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #272f5a;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #189ee9;
  }
`;
