import styled from 'styled-components';
import { getFilledArray } from 'utils/getFilledArray';
import { columnWidth } from '../../NodeArchiveList.styled';

export const Row = styled.div<{ columnsCount: number; isFault: boolean }>`
  width: max-content;
  height: 48px;
  display: grid;
  grid-template-columns: ${({ columnsCount }) =>
    getFilledArray(columnsCount, () => columnWidth).join(' ')};
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid whitesmoke;
  ${({ isFault }) => isFault && 'background-color: #ffe5e8'};
`;

export const DateWrapper = styled.div<{ isFault: boolean }>`
  font-weight: 700;
  position: sticky;
  left: 0px;
  background-color: #fff;
  ${({ isFault }) => isFault && 'background-color: #ffe5e8'};
  z-index: 5;
`;
