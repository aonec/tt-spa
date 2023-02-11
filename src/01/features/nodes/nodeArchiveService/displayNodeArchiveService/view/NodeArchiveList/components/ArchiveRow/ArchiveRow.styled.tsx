import styled from 'styled-components';
import { getFilledArray } from 'utils/getFilledArray';
import { columnWidth } from '../../NodeArchiveList.styled';

export const Row = styled.div<{ columnsCount: number }>`
  width: max-content;
  height: 50px;
  display: grid;
  grid-template-columns: ${({ columnsCount }) =>
    getFilledArray(columnsCount, () => columnWidth).join(' ')};
  grid-gap: 10px;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid whitesmoke;
`;
