import styled from 'styled-components';

export const TaskInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 0px;
  min-width: 240px;

  border-top: 1px solid #ffffff33;

  &:first-child {
    border-top: none;
  }
`;
