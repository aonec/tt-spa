import styled from 'styled-components';
import { getFilledArray } from 'utils/getFilledArray';
import { Checkbox } from 'antd';

export const columnWidth = `120px`;

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  height: calc(100vh - 160px);
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
`;

export const CheckboxSC = styled(Checkbox)`
  color: #272f5ae5;
  background-color: #fff;
  padding-bottom: 8px;
  position: sticky;
  left: 0px;
`;

export const StickyWrapper = styled.div`
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 10;
  width: fit-content;
`;

export const FirstColumn = styled.div`
  position: sticky;
  top: 0px;
  left: 0px;
  background-color: rgba(243, 245, 246, 1);
`;
