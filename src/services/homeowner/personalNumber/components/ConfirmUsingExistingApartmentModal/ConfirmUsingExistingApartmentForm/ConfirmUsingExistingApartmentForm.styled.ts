import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PersonalNumber = styled.div<{ isCurrent?: boolean }>`
  cursor: pointer;
  color: black;
  ${({ isCurrent }) =>
    isCurrent && `background-color: rgba(24, 158, 233, 1); color: white;`}
  border-radius: 5px;
  padding: 1px 8px;
  border: 2px solid rgba(24, 158, 233, 1);
  font-weight: 500;
  font-size: 14px;
  width: min-content;
  margin-right: 10px;
  transition: 0.2s;

  &:hover {
    ${({ isCurrent }) =>
      !isCurrent && `background-color: rgba(24, 158, 233, 0.2);`}
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Description = styled.div`
  color: gray;
  font-size: 18px;
`;

export const LinkSc = styled(Link)`
  color: #22232b;
  cursor: pointer;
  &:hover {
    color: #189ee9;
  }
`;
