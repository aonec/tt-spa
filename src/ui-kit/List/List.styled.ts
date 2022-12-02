import styled from 'styled-components';

export const ListItemWrapper = styled.div<{ gridTemp: string }>`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${({ gridTemp }) => gridTemp};
  padding: 8px;
  min-height: 46px;
  align-items: center;
  border-bottom: 1px solid #dcdee4;
`;
