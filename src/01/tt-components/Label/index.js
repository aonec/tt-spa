import styled, { css } from 'styled-components';

export const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #dcdee4;
  //color: rgba(39, 47, 90, 0.6);
  padding-bottom: 8px;

  ${({ color }) =>
    (color == 'rgba' &&
      css`
        color: rgba(39, 47, 90, 0.6);
      `) ||
    (color == 'grey' &&
      css`
        color: rgba(39, 47, 90, 0.6);
      `)};
`;

export default Label;
