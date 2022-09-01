import styled from 'styled-components';

export const TimeLineSC = styled.div`
  position: relative;
  flex-grow: 1;
  height: 4px;
  background: var(--bg);
  border-radius: 4px;
`;

export const Line = styled.div<{
  background: string;
  width: string;
}>`
  position: absolute;
  border-radius: inherit;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ background }) => background};
  width: ${({ width }) => width};
`;

export const TimeLineWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TimeWrapper = styled.span<{ fail?: boolean }>`
  color: ${({ fail }) => fail && 'var(--error)'};
  margin-left: 4px;
`;
