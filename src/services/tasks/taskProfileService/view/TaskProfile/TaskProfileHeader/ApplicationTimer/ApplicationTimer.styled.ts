import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  .status {
    margin-left: 8px;
  }
`;

export const TimeWrapper = styled.span<{ fail?: boolean }>`
  color: ${({ fail }) => fail && 'var(--error)'};
  margin-left: 4px;
`;
