import styled, { css } from "styled-components";

export const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  ${(props) =>
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
