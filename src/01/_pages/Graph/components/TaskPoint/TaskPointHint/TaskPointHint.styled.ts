import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const TaskInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 0px;
  width: 240px;

  border-top: 1px solid #ffffff33;

  &:first-child {
    border-top: none;
  }
`;

export const ChevronIconCS = styled(ChevronIcon)`
  cursor: pointer;
  path {
    fill: #ffffff !important;
  }

  transform: rotate(180deg);
  margin-right: 8px;
`;
