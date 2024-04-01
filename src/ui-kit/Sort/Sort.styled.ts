import styled from 'styled-components';
import { AscendingSortIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
  width: 30px;
  border-radius: 4px;
  border: 1px solid rgb(220, 222, 228);
  color: rgb(37, 47, 90);
  cursor: pointer;
`;

export const DescendingSortIconSC = styled(AscendingSortIcon)<{
  isAscending: boolean;
}>`
  transition: transform 0.5s;

  transform: ${({ isAscending }) => (!isAscending ? 'rotate(180deg)' : '')};
`;
