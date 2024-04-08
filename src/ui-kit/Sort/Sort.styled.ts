import styled from 'styled-components';
import { AscendingSortIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border: 1px solid #dcdee4;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #189ee9;
    background-color: #189ce91e;
  }
`;

export const DescendingSortIconSC = styled(AscendingSortIcon)<{
  isAscending: boolean;
}>`
  transition: transform 0.5s;

  transform: ${({ isAscending }) => (!isAscending ? 'rotate(180deg)' : '')};
`;
