import styled, { css } from 'styled-components';

const clickableMixin = css`
  color: #189ee9 !important;
`;

export const Wrapper = styled.div<{ clickable: boolean }>`
  overflow: hidden;
  max-width: 220px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    div {
      ${({ clickable }) => clickable && clickableMixin}
    }
  }
`;

export const SerialNumber = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: #272f5a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Model = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: #272f5a88;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
  min-width: 16px;
  display: flex;
  align-items: center;
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SealWrapper = styled.div`
  margin-left: 24px;

  display: flex;
  align-items: center;
  gap: 4px;
  color: #272f5ab2;
  font-size: 12px;
`;
