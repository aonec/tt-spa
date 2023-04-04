import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  height: 26px;
  color: #272f5ae5;
  width: 100%;

  user-select: none;
`;

export const Input = styled.input<{ color: string }>`
  height: 35px;
  width: 150px;
  padding: 2px 10px;
  border: 1px solid ${({ color }) => color};
  border-left: 5px solid ${({ color }) => color};
  border-radius: 5px;
  transition: 0.2s;
  margin-top: 4px;

  &:focus {
    box-shadow: 0 4px 8px rgba(7, 0, 44, 0.15);
  }
`;
