import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 3fr;
  grid-column-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  padding: 16px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  text-align: left;
`;
