import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  font-size: 14px;
`;

export const BreadCrumb = styled.span<{ isLast?: boolean }>`
  ${({ isLast }) => isLast && lastBreadCrumbCSS}
  ${({ isLast }) => !isLast && breadCrumbCSS}
`;

const lastBreadCrumbCSS = css`
  font-weight: 500;
`;

const breadCrumbCSS = css`
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;
