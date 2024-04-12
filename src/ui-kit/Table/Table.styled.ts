import { Link } from 'react-router-dom';
import { SortButton } from 'services/actsJournalService/view/ActsJournalProfile/ActsListHeader/SortButton';
import styled, { css } from 'styled-components';

const stickyWrapperCss = css`
  max-height: 64vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div<{ floating: boolean; isSticky?: boolean }>`
  max-width: 1000px;
  overflow-x: auto;

  width: ${({ floating }) => (floating ? '100%' : 'min-content')};
  ${({ isSticky }) => (isSticky ? stickyWrapperCss : '')}

  &::-webkit-scrollbar:horizontal {
    height: 26px;
  }

  &::-webkit-scrollbar-track:horizontal {
    background-color: #f3f5f6;
    border-top: 1px solid #dcdee4;
    border-bottom: 1px solid #dcdee4;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    border: solid 5px transparent;
    background-clip: content-box;
    background-color: #dcdee4;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(112, 112, 112, 0.4);
    cursor: pointer;
    user-select: none;
  }

  &::-webkit-scrollbar-button:horizontal {
    width: 28px;
    background-color: #fff;
    border: 1px solid #dcdee4;
    background-repeat: no-repeat;
    background-position: center;
  }

  &::-webkit-scrollbar-button:horizontal:start:decrement {
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;

    background-image: url('src/ui-kit/icons/svg/chevron.svg');
  }
  &::-webkit-scrollbar-button:horizontal:end:increment {
    border-end-end-radius: 6px;
    border-start-end-radius: 6px;

    background-image: url('src/ui-kit/icons/svg/chevron.svg');
  }

  &::-webkit-scrollbar-button:horizontal:start:increment {
    width: 0px;
    display: none;
  }

  &::-webkit-scrollbar-button:horizontal:end:decrement {
    width: 0px;
    display: none;
  }
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
