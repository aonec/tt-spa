import styled from 'styled-components';

export const StyledGridTableBody = styled.div`
  display: grid;
  grid-template-columns: '3fr 1.7fr 1.1fr 0.8fr 1.6fr 1.3fr 0.4fr';
  gap: 17px;
  padding: 10px 20px;
  border-bottom: 1px solid #f3f5f6;
  transition: 0.2s;

  &:hover {
    background-color: #F3FAFE;
  }

  &:last-child {
    border-bottom: none;
  }
`;
