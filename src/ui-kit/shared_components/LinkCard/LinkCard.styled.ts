import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  width: 100%;
  min-width: 312px;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
`;

export const LinkSC = styled(Link)`
  color: #189ee9;
  font-weight: 400;
  font-size: 14px;
`;
