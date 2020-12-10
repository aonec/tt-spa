import styled, { css } from 'styled-components';

export const Label = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: #272F5A;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  
  ${({ color }) => (color === 'green'
  && css`
        background: rgba(23, 180, 90, 0.2);
      `)
  || (color === 'red'
    && css`
        color: red;
      `)};
`;
