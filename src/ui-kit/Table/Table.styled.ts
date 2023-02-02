import styled from 'styled-components';

export const Header = styled.div`
  background: #f3f5f6;
  padding: 0 16px;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 0.5fr 0.2fr 0.3fr 0.35fr 0.3fr;
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 12px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Row = styled.div`
  padding: 0 16px;
  height: 50px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 0.5fr 0.2fr 0.3fr 0.35fr 0.3fr;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 400;
  font-size: 14px;
  color: #272f5a;
`;
