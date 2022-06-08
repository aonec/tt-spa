import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 920px;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr 4fr 1.3fr 1.3fr;
  grid-column-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;
