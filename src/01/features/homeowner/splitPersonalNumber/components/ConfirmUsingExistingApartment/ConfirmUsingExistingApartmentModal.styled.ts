import styled from 'styled-components';

export const PersonalNumber = styled.div<{ isCurrent?: boolean }>`
  cursor: pointer;
  color: black;
  ${({ isCurrent }) =>
    isCurrent && `background-color: rgba(24, 158, 233, 1); color: white;`}
  border-radius: 5px;
  padding: 1px 8px;
  border: 2px solid rgba(24, 158, 233, 1);
  font-weight: 500;
  font-size: 14px;
  width: min-content;
  margin-right: 10px;
  transition: 0.2s;

  &:hover {
    ${({ isCurrent }) =>
      !isCurrent && `background-color: rgba(24, 158, 233, 0.2);`}
  }
`;
