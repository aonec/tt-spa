import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  color: #272f5ae5;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #189ee9;
  }
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-left: 10px;
`;
