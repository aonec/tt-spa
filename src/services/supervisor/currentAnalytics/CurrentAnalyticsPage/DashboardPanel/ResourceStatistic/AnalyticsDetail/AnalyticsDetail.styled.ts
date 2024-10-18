import styled from 'styled-components';

export const Wrapper = styled.div<{ danger: boolean }>`
  background: ${({ danger }) => (danger ? '#FC525B1A' : '#f3f5f6')};
  padding: 6px 8px;
  border-radius: 4px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: #272f5aa6;
`;

export const Name = styled.div`
  font-weight: 500;
  color: #272f5a;
`;

export const NotClosedTasksCount = styled.span<{ danger: boolean }>`
  color: ${({ danger }) => (danger ? '#FC525B' : 'inherit')};
  font-weight: ${({ danger }) => (danger ? '700' : 'initial')};
`;
