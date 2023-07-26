import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 64px;
`;

export const Panel = styled.div`
  position: fixed;
  bottom: 0px;
  left: 208px;

  padding: 16px 56px;
  width: calc(100% - 208px);
  background: #ffffff;
  box-shadow: 0px -4px 8px 0px rgba(78, 93, 146, 0.16);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;
