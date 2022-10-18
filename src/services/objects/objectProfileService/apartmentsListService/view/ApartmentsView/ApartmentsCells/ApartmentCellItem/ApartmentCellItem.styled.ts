import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CellWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background: #ffffff;
  border: 1px solid #f3f5f6;
  box-shadow: 0 5px 10px rgba(0, 10, 60, 0.14);
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
  overflow: hidden;
  color: #272f5a;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 5px 10px rgba(0, 10, 60, 0.2);
  }
`;
