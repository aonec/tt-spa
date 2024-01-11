import styled from 'styled-components';

export const HomeownerNameWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HomeownerNumberWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #272f5ab2;
`;

export const RowStyle = `
  grid-gap: 0px;
  cursor: pointer;
  transition: 0.2s;
  color: #272f5a;

  &:hover {
    color: #3241e6;
    background-color: #3948f113;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const HeaderStyles = `
  grid-gap: 0px;
`;
