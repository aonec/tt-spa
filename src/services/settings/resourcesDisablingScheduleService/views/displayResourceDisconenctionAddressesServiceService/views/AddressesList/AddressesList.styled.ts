import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  align-items: center;
  grid-gap: 16px;

  background-color: #f3f5f6;
  color: #272f5ae5;
  font-size: 12px;
  padding: 16px;
  height: 48px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
