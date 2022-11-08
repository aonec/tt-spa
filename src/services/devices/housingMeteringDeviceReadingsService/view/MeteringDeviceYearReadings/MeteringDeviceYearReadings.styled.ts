import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Year = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #dcdee4;

  margin-top: 8px;
  padding: 8px 16px;
  font-size: 16px;
  color: #272f5ae5;

  user-select: none;
  cursor: pointer;
`;

export const ArrowSC = styled(ChevronIcon)<{ open: boolean }>`
  transition: 0.2s;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(-90deg)')};
  cursor: pointer;
`;
