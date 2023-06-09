import styled from 'styled-components';

export const DateWrapper = styled.span<{ bold: boolean | undefined }>`
  margin: 0 auto;
  color: ${({ bold }) => (bold ? '#272f5a' : '#000000d9')};
  font-weight: ${({ bold }) => (bold ? '500' : '400')};
  opacity: ${({ bold }) => (bold ? '1' : '0.7')};
`;
