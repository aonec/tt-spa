import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow-x: auto;
`;

export const Header = styled.div<{ temp: string }>`
  width: max-content;
  background: #f3f5f6;
  padding: 0 16px;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ temp }) => temp};
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 12px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  width: 100%;
`;

export const Row = styled.div<{ temp: string }>`
  width: max-content;
  padding: 0 16px;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ temp }) => temp};
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 400;
  font-size: 14px;
  color: #272f5a;
  width: 100%;
`;
