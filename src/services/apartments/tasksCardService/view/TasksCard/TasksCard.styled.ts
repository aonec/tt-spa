import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;
  box-shadow: 0 4px 4px rgba(0, 0, 20, 0.16);
  border-radius: 4px;
  width: 100%;
  min-width: 200px;
`;

export const TasksNumberWrapper = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
`;

export const MoreWrapper = styled(Link)`
  color: #189ee9;
`;
