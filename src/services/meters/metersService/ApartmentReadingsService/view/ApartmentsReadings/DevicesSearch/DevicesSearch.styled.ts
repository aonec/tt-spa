import styled from 'styled-components';

export const Device = styled.div`
  padding: 15px;
  cursor: pointer;
  z-index: 0;
  transition: 0.2s;
  border-radius: 10px;
  border: 1px solid rgba(24, 158, 233, 0);

  &:hover {
    border: 1px solid rgba(24, 158, 233, 0.3);
    background: rgba(24, 158, 233, 0.07);
    z-index: 1;

    * {
      color: #000000e1;
    }
  }
`;
