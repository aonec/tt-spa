import styled from 'styled-components';

export const IconWrapper = styled.div<{ color?: string }>`
  path {
    ${({ color }) => `fill: ${color};`}
  }
`;

export const AlertWrap = styled.div<{ color?: string }>`
  display: flex;
  align-items: flex-start;

  background: ${({ color }) => `#${color || '189ee9'}35`};
  border-left: 2px solid ${({ color }) => `#${color || '189ee9'}`};
  padding: 10px 18px;
  color: #272f5a;
`;

export const Wide = styled.div`
  margin-left: 16px;
  width: 100%;
`;
