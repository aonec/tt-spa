import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const selectedPanelStyles = css`
  background: #272f5a;
  color: white;
  border-color: #272f5a;
`;

export const ItemPanel = styled.div<{ isSelected: boolean }>`
  flex: 1 1 auto;
  background: #f3f5f6;
  border: 1px solid #dcdee4;
  border-radius: 4px;
  display: flex;
  gap: 12px;
  padding: 0 12px;
  height: 34px;
  color: rgba(39, 47, 90, 0.9);
  align-items: center;
  white-space: nowrap;
  max-width: min-content;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 7px #02004b1f;
  }

  ${({ isSelected }) => isSelected && selectedPanelStyles}
`;
