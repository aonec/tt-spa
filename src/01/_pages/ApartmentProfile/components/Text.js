import styled, { css } from 'styled-components';

export const Text = styled.p`
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${(props) =>
    (props.size === 12 &&
      css`
        font-size: 12px;
        line-height: 16px;
      `) ||
    (props.size === 24 &&
      css`
        font-size: 24px;
        line-height: 48px;
      `) ||
    (props.size === 32 &&
      css`
        font-size: 32px;
        line-height: 48px;
      `)};
`;
