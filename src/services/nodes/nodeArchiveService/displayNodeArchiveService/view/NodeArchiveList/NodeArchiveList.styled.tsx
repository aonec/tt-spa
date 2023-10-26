import styled from 'styled-components';
import { getFilledArray } from 'utils/getFilledArray';
import { Checkbox } from 'antd';

export const columnWidth = `120px`;

export const Wrapper = styled.div`
  width: 800px;
`;

export const Header = styled.div<{ columnsCount: number }>`
  width: max-content;
  height: 48px;
  background: rgba(243, 245, 246, 1);
  display: grid;
  grid-template-columns: ${({ columnsCount }) =>
    getFilledArray(columnsCount, () => columnWidth).join(' ')};
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
  margin-top: 8px;
`;

export const CheckboxSC = styled(Checkbox)`
  color: #272f5ae5;
`;

export const StickyWrapper = styled.div`
  position: sticky;
  top: 124px;
  background-color: #fff;
`;
