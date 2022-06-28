import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 64px;
`;

export const Panel = styled.div`
  position: fixed;
  bottom: 0px;
  height: 64px;
  left: 208px;
  width: calc(100% - 208px);
  background-color: #ffffff74;
  box-shadow: 0px -4px 8px rgba(78, 93, 146, 0.16);
  backdrop-filter: blur(3px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 56px;
`;

export const TextWrapper = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 16px;
`;
