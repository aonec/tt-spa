import styled, { FlattenSimpleInterpolation } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  overflow-x: auto;
`;

export const Header = styled.div<{ temp: string }>`
  width: max-content;
  background: #f3f5f6;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ temp }) => temp};
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 12px;
  align-items: center;
`;

export const Row = styled.div<{ temp: string }>`
  width: max-content;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ temp }) => temp};
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-weight: 400;
  font-size: 14px;
  color: #272f5a;
`;

export const PaginationWrapper = styled.div`
  margin: 16px;
`;

export const TableElement = styled.div<{ css?: FlattenSimpleInterpolation }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  ${({ css }) => css || ''}
`;
