import styled from 'styled-components';

export const Wrapper = styled.div``;

const grid = '0.7fr 0.3fr 0.3fr 0.3fr 0.26fr 0.5fr';

export const Header = styled.div`
  height: 50px;
  padding: 0 25px;
  background: #f3f5f6;
  display: grid;
  grid-gap: 0 15px;
  align-items: center;
  grid-template-columns: ${grid};
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  z-index: 2;
  box-shadow: inset 0px 4px 4px rgba(78, 93, 146, 0.16);
`;
