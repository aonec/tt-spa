import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Header = styled.div`
  min-width: 930px;
  display: grid;
  align-items: center;
  grid-template-columns: 0.6fr 1fr 0.5fr 0.5fr 0.5fr;
  grid-gap: 15px;

  background: rgba(39, 47, 90, 0.04);
  height: 48px;
  padding: 0 15px;
  border-bottom: 1px solid #dcdee4;
  font-weight: 400;
  line-height: 16px;

  .device-info {
    font-weight: 600;
  }
`;
