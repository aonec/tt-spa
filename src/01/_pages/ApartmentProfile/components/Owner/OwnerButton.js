import styled, { css } from 'styled-components'

export const OwnerButton = styled.button`
    border: 1px solid #DCDEE4;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;

  ${props =>
        props.primary &&
        css`
      background: palevioletred;
      color: white;
    `};
`