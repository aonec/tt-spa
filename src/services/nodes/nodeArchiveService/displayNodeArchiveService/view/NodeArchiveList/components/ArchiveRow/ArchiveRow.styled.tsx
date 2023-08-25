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
  ${({ isFault }) => isFault && 'background-color: #fc525b26'};
`;

export const DateWrapper = styled.div`
  font-weight: 700;
`;
