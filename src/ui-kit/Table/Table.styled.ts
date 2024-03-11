import { Link } from 'react-router-dom';
import { SortButton } from 'services/actsJournalService/view/ActsJournalProfile/ActsListHeader/SortButton';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ floating: boolean }>`
  max-width: 1200px;
  overflow-x: auto;
  width: ${({ floating }) => (floating ? '100%' : 'min-content')};
`;

const stickyHeaderCss = css`
  position: sticky;
  top: 0px;
  z-index: 10;
`;

export const HeaderWrapper = styled.div<{ isSticky?: boolean }>`
  ${({ isSticky }) => (isSticky ? stickyHeaderCss : '')}
`;

export const Header = styled.div<{
  temp: string;
  css?: string;
}>`
  width: max-content;
  background: #f3f5f6;
  min-height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ temp }) => temp};
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 12px;
  align-items: center;
  ${({ css }) => css || ''}
`;

const RowStyle = css<{ temp: string; css?: string }>`
  width: max-content;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-weight: 400;
  font-size: 14px;
  color: #272f5a;
`;

export const Row = styled.div<{ temp: string; css?: string }>`
  ${RowStyle}
  grid-template-columns: ${({ temp }) => temp};
  ${({ css }) => css || ''}
`;

export const RowLink = styled(Link)<{ temp: string; css?: string }>`
  ${RowStyle}
  grid-template-columns: ${({ temp }) => temp};
  ${({ css }) => css || ''}
`;

export const PaginationWrapper = styled.div`
  margin: 16px;
`;

export const TableElement = styled.div<{ css?: string }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  ${({ css }) => css || ''}
`;

export const SortButtonSC = styled(SortButton)`
  margin-left: 4px;
`;
