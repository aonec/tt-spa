import styled, { css } from 'styled-components';

const wrapperPaddingStyles = css`
  padding: 0 56px;
  height: 64px;
  margin-bottom: 0;
  z-index: 5;
  width: 100%;
  border-bottom: 1px solid #dcdee4;
`;

export const PageHeaderStyled = styled.div<{ hasPaddings?: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px 0;
  justify-content: space-between;
  ${({ hasPaddings }) => hasPaddings && wrapperPaddingStyles}
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ContextMenuWrapper = styled.div`
  margin-left: 15px;
`;
