import styled, { css } from 'styled-components';

const panelActiveCSS = css`
  color: #189ee9;
  border-color: #189ee9;
  box-shadow: 0px 0px 0px 2px #00c2ff26;
`;

export const Wrapper = styled.div<{ isActive: boolean }>`
  border-radius: 4px;
  padding: 14px 16px 12px;
  height: 72px;
  width: 100%;
  border: 1px solid #dcdee4;
  color: #272f5a;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  box-shadow: 0px 0px 8px 0px #00000026;

  ${({ isActive }) => isActive && panelActiveCSS}

  transition: 0.2s;

  &:hover {
    ${panelActiveCSS}
  }
`;

export const Title = styled.div`
  font-size: 16px;
`;

export const Content = styled.div`
  font-size: 28px;
  font-weight: bold;
`;
