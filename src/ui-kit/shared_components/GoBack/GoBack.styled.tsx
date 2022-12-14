import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const GoBackSC = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #272f5a;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #189ee9;

    svg {
      path {
        fill: #189ee9;
      }
    }
  }
`;

export const ChevronIconSC = styled(ChevronIcon)`
  path {
    fill: #272f5a;
    fill-opacity: 1;
  }
`;

export const HeaderInfoStringWrapper = styled.div`
  margin-top: -25px;
`;
